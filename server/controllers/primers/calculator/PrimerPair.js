// Exports PrimerPair class

const { params, NaConc, weights } = require('./params');

const PrimerPair = class {
	constructor(exons, exonInd, fLeft, fRight, rLeft, rRight) {
		// General info
		this.id;
		this.favorite = false;
		this.exon = exonInd + 1;
		//Primers info
		this.fPrimer = exons[exonInd].substring(fLeft, fRight);
		this.rPrimerOriginal = exons[exonInd + 1].substring(rLeft, rRight);
		this.rPrimer = reverseComplement(this.rPrimerOriginal);
		this.dist = exons[exonInd].length - fRight + rLeft;
		this.length = this.dist + this.fPrimer.length + this.rPrimer.length;
		this.fInd = fLeft;
		this.rInd = rLeft;
		this.fLen = fRight - fLeft;
		this.rLen = rRight - rLeft;
		this.fClamps = clamps(this.fPrimer);
		this.rClamps = clamps(this.rPrimer);
		let fGCATContent = GCATContent(this.fPrimer);
		let rGCATContent = GCATContent(this.rPrimer);
		this.fPercentGC = percentGC(fGCATContent);
		this.rPercentGC = percentGC(rGCATContent);
		this.fMeltTempBasic = meltTempBasic(fGCATContent);
		this.rMeltTempBasic = meltTempBasic(rGCATContent);
		this.fMeltTempSalt = meltTempSalt(fGCATContent);
		this.rMeltTempSalt = meltTempSalt(rGCATContent);
		this.meltTempDiffBasic = Math.abs(
			this.fMeltTempBasic - this.rMeltTempBasic
		);
		this.meltTempDiffSalt = Math.abs(this.fMeltTempSalt - this.rMeltTempSalt);
		this.dimer = false;
		this.fHairpin = false;
		this.rHairpin = false;
		this.tempDiffScore;
		this.indMeltTempScore;
		this.indGCContentScore;
		this.lengthScore;
		this.clampScore;
		this.score = this.score();
	}

	score() {
		const tempDiffBound = 5;
		const indTempBound = 5;
		const lengthBound = 20;
		const GCContentBound = 10;
		if (params.temperature.type == 'Basic') {
			this.tempDiffScore = purity(this.meltTempDiffBasic, 0, tempDiffBound);
			this.indMeltTempScore =
				(purity(this.fMeltTempBasic, params.temperature.ideal, indTempBound) +
					purity(this.rMeltTempBasic, params.temperature.ideal, indTempBound)) /
				2;
		} else if (params.temperature.type == 'Salt Adjusted') {
			this.tempDiffScore = purity(this.meltTempDiffSalt, 0, tempDiffBound);
			this.indMeltTempScore =
				(purity(this.fMeltTempSalt, params.temperature.ideal, indTempBound) +
					purity(this.rMeltTempSalt, params.temperature.ideal, indTempBound)) /
				2;
		}
		this.lengthScore = purity(
			this.dist + this.rLen + this.fLen,
			params.length.total,
			lengthBound
		);

		this.indGCContentScore = 0;
		if (
			this.fPercentGC >= params.percentGC.lower &&
			this.fPercentGC <= params.percentGC.upper
		) {
			this.indGCContentScore += 0.5;
		} else {
			this.indGCContentScore +=
				purity(
					Math.min(
						this.fPercentGC,
						params.percentGC.lower + params.percentGC.upper - this.fPercentGC
					),
					params.percentGC.lower,
					GCContentBound
				) / 2;
		}
		if (
			this.rPercentGC >= params.percentGC.lower &&
			this.rPercentGC <= params.percentGC.upper
		) {
			this.indGCContentScore += 0.5;
		} else {
			this.indGCContentScore +=
				purity(
					Math.min(
						this.rPercentGC,
						params.percentGC.lower + params.percentGC.upper - this.rPercentGC
					),
					params.percentGC.lower,
					GCContentBound
				) / 2;
		}

		this.clampScore = 0;
		if (this.fClamps.starts) {
			this.clampScore += 0.25;
		}
		if (this.fClamps.ends) {
			this.clampScore += 0.25;
		}
		if (this.rClamps.starts) {
			this.clampScore += 0.25;
		}
		if (this.rClamps.ends) {
			this.clampScore += 0.25;
		}

		return (
			weights.tempDiff * this.tempDiffScore +
			weights.indMeltTemp * this.indMeltTempScore +
			weights.indGCContent * this.indGCContentScore +
			weights.length * this.lengthScore +
			weights.clamps * this.clampScore
		);
	}
};

const reverseComplement = (primer) => {
	let arr = new Array(primer.length);
	for (let i = 0; i < primer.length; i++) {
		switch (primer.substring(i, i + 1)) {
			case 'C':
				arr[primer.length - 1 - i] = 'G';
				break;
			case 'G':
				arr[primer.length - 1 - i] = 'C';
				break;
			case 'A':
				arr[primer.length - 1 - i] = 'T';
				break;
			case 'T':
				arr[primer.length - 1 - i] = 'A';
				break;
		}
	}
	return arr.join('');
};

const GCATContent = (primer) => {
	let content = {
		total: 0,
		G: 0,
		C: 0,
		A: 0,
		T: 0,
	};
	for (let base of primer) {
		content[base] += 1;
		content.total += 1;
	}
	return content;
};

const clamps = (primer) => {
	return {
		starts:
			(primer.charAt(0) == 'G' || primer.charAt(0) == 'C') &&
			(primer.charAt(1) == 'G' || primer.charAt(1) == 'C'),
		ends:
			(primer.charAt(primer.length - 2) == 'G' ||
				primer.charAt(primer.length - 2) == 'C') &&
			(primer.charAt(primer.length - 1) == 'G' ||
				primer.charAt(primer.length - 1) == 'C'),
	};
};

const percentGC = (content) => {
	return (100 * (content.G + content.C)) / content.total;
};

const meltTempBasic = (content) => {
	return (
		64.9 +
		(41 * (content.G + content.C - 16.4)) /
			(content.A + content.T + content.G + content.C)
	);
};

const meltTempSalt = (content) => {
	return (
		100.5 +
		(41 * (content.G + content.C)) /
			(content.A + content.T + content.G + content.C) -
		820 / (content.A + content.T + content.G + content.C) +
		16.6 * Math.log10(NaConc)
	);
};

// Ideal has value of 1, approaches 0 as closer to bound
const purity = (value, ideal, bound) => {
	// Normal distr
	//SD = bound / 2;
	//return Math.exp(-0.5 * Math.pow((value - ideal) / SD, 2));

	// Linear
	return Math.max(-1 * Math.abs((value - ideal) / bound) + 1, 0);
};

module.exports = PrimerPair;

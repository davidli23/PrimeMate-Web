// Exports getPrimers function

const PrimerPair = require('./PrimerPair');
const { params, NaConc } = require('./params');

const minLen = params.length.lower;
const maxLen = params.length.upper;
const minDist = Math.floor(
	(params.length.total - params.length.upper - params.length.lower) / 2
);
const maxDist =
	2 * (params.length.total - params.length.upper - params.length.lower) -
	minDist;
const dimerThresh = params.dimerThresh;
const exonOneChecked = params.exonOneChecked;

const getPrimers = (exons) => {
	// 2D array of potential primer pairs
	let primerPairs = [];
	// Loop through each exon
	let i = 0;
	exons.forEach((exon, exonInd) => {
		// Check if first or last exon
		if (
			(1 <= exonInd && exonInd < exons.length - 1) ||
			(exonInd == 0 && exonOneChecked)
		) {
			// Loop through each starting index, taking the best pair with that starting index
			for (
				let fLeft = Math.max(0, exon.length - maxDist - maxLen);
				fLeft <= exon.length - minLen;
				fLeft++
			) {
				let primerPair = bestPrimerPair(exons, exonInd, fLeft);
				if (primerPair != null) {
					primerPair.fHairpin = hasHairpin(primerPair.fPrimer);
					primerPair.rHairpin = hasHairpin(primerPair.rPrimer);
					primerPair.dimer =
						isDimer(primerPair.fPrimer, primerPair.rPrimer) ||
						isDimer(primerPair.fPrimer, primerPair.fPrimer) ||
						isDimer(primerPair.rPrimer, primerPair.rPrimer);
					if (isValidPair(primerPair)) {
						primerPairs.push(primerPair);
						primerPair.id = i;
						i += 1;
					}
				}
			}
		}
	});
	primerPairs.sort(function (p1, p2) {
		return p2.score - p1.score;
	});
	return primerPairs;
};

const bestPrimerPair = (exons, exonInd, fLeft) => {
	let bestPrimerPair = null;
	let bestScore = 0;

	// Loop through each possible primer pair
	for (
		let fRight = fLeft + minLen;
		fRight <= Math.min(exons[exonInd].length, fLeft + maxLen);
		fRight++
	) {
		for (
			let rLeft = Math.max(0, minDist - (exons[exonInd].length - fRight));
			rLeft <
			Math.min(
				exons[exonInd + 1].length - minLen,
				maxDist - (exons[exonInd].length - fRight) + 1
			);
			rLeft++
		) {
			for (
				let rRight = rLeft + minLen;
				rRight <= Math.min(exons[exonInd + 1].length, rLeft + maxLen);
				rRight++
			) {
				let primerPair = new PrimerPair(
					exons,
					exonInd,
					fLeft,
					fRight,
					rLeft,
					rRight
				);
				if (primerPair.score > bestScore) {
					bestPrimerPair = primerPair;
					bestScore = primerPair.score;
				}
			}
		}
	}
	return bestPrimerPair;
};

const complementary = (b1, b2) => {
	return (
		(b1 == 'C' && b2 == 'G') ||
		(b1 == 'G' && b2 == 'C') ||
		(b1 == 'A' && b2 == 'T') ||
		(b1 == 'T' && b2 == 'A')
	);
};

const isValidPair = (primerPair) => {
	return !primerPair.dimer && !primerPair.fHairpin && !primerPair.rHairpin;
};

const isDimer = (fPrimer, rPrimer) => {
	for (let lInd = 0; lInd <= fPrimer.length - dimerThresh; lInd++) {
		for (let rInd = 0; rInd <= rPrimer.length - dimerThresh; rInd++) {
			let notOk = true;
			for (let i = 0; i < dimerThresh; i++) {
				if (
					!complementary(
						fPrimer.substring(lInd + i, lInd + i + 1),
						rPrimer.substring(rInd + i, rInd + i + 1)
					)
				) {
					notOk = false;
					break;
				}
			}
			if (notOk) {
				return true;
			}
		}
	}
	return false;
};

const hasHairpin = (primer) => {
	for (let lInd = 0; lInd <= primer.length - 2 * dimerThresh; lInd++) {
		for (
			let rInd = lInd + dimerThresh;
			rInd <= primer.length - dimerThresh;
			rInd++
		) {
			let isHairpin = true;
			for (let i = 0; i < dimerThresh; i++) {
				if (
					!complementary(
						primer.substring(lInd + i, lInd + i + 1),
						primer.substring(rInd + dimerThresh - i - 1, rInd + dimerThresh - i)
					)
				) {
					isHairpin = false;
					break;
				}
			}
			if (isHairpin) {
				return true;
			}
		}
	}
	return false;
};

module.exports = getPrimers;

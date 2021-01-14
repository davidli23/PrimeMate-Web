const getExonsIntrons = (seq) => {
	let exons = [];
	let intronLengths = [];
	let onExons = true;
	let left = 0;
	const upper = new Set(['A', 'C', 'G', 'T']);
	const lower = new Set(['a', 'c', 'g', 't']);
	for (let i = 0; i < seq.length; i++) {
		if (onExons && lower.has(seq.charAt(i))) {
			exons.push(seq.substring(left, i));
			onExons = false;
			left = i;
		} else if (!onExons && upper.has(seq.charAt(i))) {
			intronLengths.push(i - left);
			onExons = true;
			left = i;
		}
	}
	exons.push(seq.substring(left));
	return {
		exons: exons,
		intronLengths: intronLengths,
	};
};

module.exports = getExonsIntrons;

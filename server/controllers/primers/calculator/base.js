const getPrimers = require('./getPrimers');

const calculator = (seq) => {
	return getPrimers(getExons(seq));
};

const getExons = (seq) => {
	let exonSeq = seq;
	exonSeq = exonSeq.replace(/Aa|Ac|Ag|At/g, 'A,');
	exonSeq = exonSeq.replace(/Ca|Cc|Cg|Ct/g, 'C,');
	exonSeq = exonSeq.replace(/Ga|Gc|Gg|Gt/g, 'G,');
	exonSeq = exonSeq.replace(/Ta|Tc|Tg|Tt/g, 'T,');
	exonSeq = exonSeq.replace(/a|c|g|t/g, '');
	return exonSeq.split(',');
};

module.exports = calculator;

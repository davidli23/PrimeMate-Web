const getPrimers = require('./getPrimers');
const getExonsIntrons = require('./getExonsIntrons');

const getData = (seq) => {
	const { exons, intronLengths } = getExonsIntrons(seq);
	const primerPairs = getPrimers(exons);
	return {
		exons: exons,
		intronLengths: intronLengths,
		primerPairs: primerPairs,
	};
};

module.exports = getData;

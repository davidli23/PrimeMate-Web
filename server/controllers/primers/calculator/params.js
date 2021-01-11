const NaConc = 0.05;
exports.NaConc = NaConc;

const params = {
	length: {
		lower: 18,
		upper: 24,
		total: 100,
	},
	percentGC: {
		lower: 40,
		upper: 60,
	},
	temperature: {
		type: 'Salt Adjusted',
		ideal: 60,
	},
	dimerThresh: 5,
	exonOneChecked: false,
};
exports.params = params;

const weights = {
	tempDiff: 20,
	indMeltTemp: 20,
	indGCContent: 20,
	length: 20,
	clamps: 20,
};
exports.weights = weights;

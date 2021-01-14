const axios = require('axios');
const getData = require('./calculator/getData');

exports.primers = (req, res) => {
	axios
		.get(`http://rest.ensembl.org/lookup/id/${req.params.id}`)
		.then((lookupRes) => {
			const apiRes = {
				name: lookupRes.data.display_name,
			};
			axios
				.get(
					`http://rest.ensembl.org/sequence/id/${req.params.id}?mask_feature=1`
				)
				.then((seqRes) => {
					const data = getData(seqRes.data.seq);
					apiRes.exons = data.exons;
					apiRes.intronLengths = data.intronLengths;
					apiRes.primerPairs = data.primerPairs;
					res.json(apiRes);
				});
		})
		.catch(() => {
			res.status(400).send('Invalid id');
		});
};

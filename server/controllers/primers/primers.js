const axios = require('axios');
const calculator = require('./calculator/base');

exports.primers = (req, res) => {
	axios
		.get(
			'http://rest.ensembl.org/sequence/id/'
				.concat(req.params.id)
				.concat('?mask_feature=1')
		)
		.then((ensRes) => {
			console.log(calculator(ensRes.data.seq));
			res.send(calculator(ensRes.data.seq));
		})
		.catch(() => {
			//console.log('Invalid id');
		});
};

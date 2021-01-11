import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

const PrimerResults = () => {
	const [primer, setPrimer] = useState('');
	const { id } = useParams();
	// fetch('/api/primers/'.concat(id))
	// 	.then((res) => res.json())
	// 	.catch((err) => {
	// 		console.log('nope');
	// 	})
	// 	.then((apiRes) => {
	// 		setPrimer(apiRes.primerPairs[0].fPrimer);
	// 	});

	fetch('/test')
		.then((res) => res.json())
		.then((apiRes) => {
			setPrimer(apiRes.text);
		});

	return (
		<>
			<h3>first priemr</h3>
			<p style={{ wordBreak: 'break-all' }}>
				{primer} {id}
			</p>
		</>
	);
};

export default PrimerResults;

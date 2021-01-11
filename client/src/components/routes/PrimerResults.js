import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

const PrimerResults = () => {
	const [primer, setPrimer] = useState('');
	const { id } = useParams();
	fetch('/api/primers/'.concat(id))
		.then((res) => res.json())
		.catch((err) => {
			console.log('nope');
		})
		.then((apiRes) => {
			setPrimer(apiRes.primerPairs[0].fPrimer);
		});

	// fetch('https://primemate-server.herokuapp.com/test')
	// 	.then((res) => res.json())
	// 	.then((apiRes) => {
	// 		setPrimer(apiRes.text);
	// 	})
	// 	.catch((err) => console.log(err));

	return (
		<>
			<h3>First Forward Primer</h3>
			<p style={{ wordBreak: 'break-all' }}>{primer}</p>
		</>
	);
};

export default PrimerResults;

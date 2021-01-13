import React, { useState, useEffect } from 'react';
import globals from '../../globals';

import { useParams } from 'react-router-dom';

const PrimerResults = () => {
	const [primer, setPrimer] = useState('');
	const [isCalculating, setIsCalculating] = useState(true);
	const { id } = useParams();
	useEffect(() => {
		fetch(`${globals.SERVER_HOST}/api/primers/${id}`)
			.then((res) => res.json())
			.then((primers) => {
				setPrimer(primers.primerPairs[0].fPrimer);
				setIsCalculating(false);
			})
			.catch((err) => {
				setIsCalculating(false);
				setPrimer('Invalid id');
			});
	}, [id]);

	// fetch('https://primemate-server.herokuapp.com/test')
	// 	.then((res) => res.json())
	// 	.then((apiRes) => {
	// 		setPrimer(apiRes.text);
	// 	})
	// 	.catch((err) => console.log(err));

	return (
		<>
			{isCalculating && <h4>Calculating</h4>}
			<h3>First Forward Primer</h3>
			<p style={{ wordBreak: 'break-all' }}>{primer}</p>
		</>
	);
};

export default PrimerResults;

import React, { useState, useEffect } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import ResultsPage from '../modules/primer-results/Results';

import globals from '../../globals';

import { useParams } from 'react-router-dom';

const loaderColor = '#404040';

const PrimerResults = () => {
	const [primerPairs, setPrimerPairs] = useState([]);
	const [transName, setTransName] = useState('');
	const [isCalculating, setIsCalculating] = useState(true);
	const { id } = useParams();
	useEffect(() => {
		fetch(`${globals.SERVER_HOST}/api/primers/${id}`)
			.then((res) => res.json())
			.then((apiRes) => {
				setTransName(apiRes.name);
				setPrimerPairs(apiRes.primerPairs);
				setIsCalculating(false);
			})
			.catch((err) => {
				setIsCalculating(false);
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
			<div className="center-content">
				<SyncLoader loading={isCalculating} color={loaderColor} size={25} />
			</div>
			{!isCalculating && (
				<ResultsPage name={transName} primerPairs={primerPairs} />
			)}
		</>
	);
};

export default PrimerResults;

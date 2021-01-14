import React from 'react';

const Results = ({ name, primerPairs }) => {
	return (
		<>
			<h1>Name: {name}</h1>
			<div>First Primer: {JSON.stringify(primerPairs[0])}</div>
		</>
	);
};

export default Results;

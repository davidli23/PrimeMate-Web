import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './_primerForm.scss';

const PrimerForm = () => {
	const [transID, setTransID] = useState('');

	const history = useHistory();

	const handleChange = (e) => {
		setTransID(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push('/primers/results/'.concat(transID.split('.')[0]));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="trans-id">Transcript ID</label>
			<input
				type="text"
				id="trans-id"
				value={transID}
				onChange={handleChange}
			/>
			<input type="submit" />
		</form>
	);
};

export default PrimerForm;

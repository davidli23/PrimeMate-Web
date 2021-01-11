import React, { useState } from 'react';
import './_primerForm.scss';

const PrimerForm = () => {
	const [transID, setTransID] = useState('');

	const handleChange = (e) => {
		setTransID(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(transID);
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

import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

const PrimerResults = () => {
	const [seqLength, setSeqLength] = useState('');
	const [seq, setSeq] = useState('');
	const { id } = useParams();
	fetch('/api/primers/'.concat(id))
		.then((res) => res.json())
		.catch((err) => {
			console.log('nope');
			setSeq('Invalid id');
		})
		.then((apiRes) => {
			setSeq(apiRes);
		});
	return (
		<>
			<h3>Sequence Length</h3>
			<p style={{ wordBreak: 'break-all' }}>{seqLength}</p>
			<h3>Sequence</h3>
			<p style={{ wordBreak: 'break-all' }}>{seq}</p>
		</>
	);
};

export default PrimerResults;

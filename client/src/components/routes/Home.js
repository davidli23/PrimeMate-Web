import React from 'react';

import Container from '../modules/container/Container';
import Title from '../modules/title/Title';

const Home = () => {
	return (
		<Container>
			<Title />
			<h2 style={{ textAlign: 'center' }}>
				Welcome to the official PrimeMate website!
			</h2>
		</Container>
	);
};

export default Home;

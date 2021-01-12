import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Navbar from '../modules/navbar/Navbar';
import Home from './Home';
import Login from './Login';
import Primers from './Primers';
import PrimerResults from './PrimerResults';

const ReactRouterSetup = () => {
	return (
		<Router>
			<Navbar />
			<Route exact path="/">
				<Redirect to="/home" />
			</Route>
			<Route path="/home">
				<Home />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route exact path="/primers">
				<Primers />
			</Route>
			<Route path="/primers/results/:id">
				<PrimerResults />
			</Route>
		</Router>
	);
};

export default ReactRouterSetup;

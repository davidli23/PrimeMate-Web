import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import Navbar from '../modules/navbar/Navbar';
import Container from '../modules/container/Container';
import Home from './HomePage';
import Login from './LoginPage';
import Primers from './PrimersPage';
import PrimerResults from './PrimerResultsPage';
import NotFound from './NotFoundPage';

const ReactRouterSetup = () => {
	return (
		<Router>
			<Navbar />
			<Container>
				<Switch>
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
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default ReactRouterSetup;

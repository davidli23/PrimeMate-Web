import React from 'react';
import { Link } from 'react-router-dom';

import './_navbar.scss';

const Navbar = () => {
	return (
		<ul className="navbar">
			<li>
				<Link to="/home" className="nav-link">
					Home
				</Link>
			</li>
			<li>
				<Link to="/primers" className="nav-link">
					Primers
				</Link>
			</li>
			<li className="nav-right">
				<Link to="/login" className="nav-link">
					Login
				</Link>
			</li>
		</ul>
	);
};

export default Navbar;

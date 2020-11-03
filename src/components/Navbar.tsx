import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
	return (
		<nav>
			<header id="header">
				<h1>Cocktail Buddy</h1>
			</header>
			<ul>
				<li>
					<NavLink to="/search">
						<i className="fas fa-fw fa-search"></i>
						<span>Search</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/collection">
						<i className="fas fa-fw fa-glass-martini-alt"></i>
						<span>Collection</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/profile">
						<i className="far fa-fw fa-user-circle"></i>
						<span>Profile</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/signin">
						<i className="fas fa-fw fa-sign-in-alt"></i>
						<span>Sign in</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/signup">
						<i className="fas fa-fw fa-user-plus"></i>
						<span>Sign up</span>
					</NavLink>
				</li>
				<li>
					<a>
						<i className="fas fa-fw fa-sign-out-alt"></i>
						<span>Sign out</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

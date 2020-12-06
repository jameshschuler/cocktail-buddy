import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../App';
import { useStoreState } from '../store/storeModel';

interface NavbarProps {
	loading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loading }) => {
	const user = useStoreState((state) => state.user);

	return (
		<nav>
			<header id="header">
				<h1>
					<NavLink to="/search">Cocktail Buddy</NavLink>
				</h1>
			</header>
			<ul>
				<li>
					<NavLink to="/search">
						<i className="fas fa-fw fa-search"></i>
						<span>Search</span>
					</NavLink>
				</li>
				{!loading && user !== null && (
					<>
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
						<li
							onClick={async () => {
								await auth.signOut();
							}}
							className="hoverable"
						>
							<a>
								<i className="fas fa-fw fa-sign-out-alt"></i>
								<span>Sign out</span>
							</a>
						</li>
					</>
				)}
				{!loading && user === null && (
					<>
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
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;

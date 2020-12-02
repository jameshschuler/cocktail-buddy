import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../context/AppContext';
import AddSpirit from './collection/AddSpirit';
import Collection from './collection/Collection';
import ProtectedRoute from './helpers/ProtectedRoute';
import Profile from './Profile';
import CocktailDetail from './search/CocktailDetail';
import Search from './search/Search';
import SearchResults from './search/SearchResults';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Content: React.FC = () => {
	const { user } = useContext(UserContext);

	return (
		<>
			<Route exact path="/search">
				<Search />
				<SearchResults />
			</Route>
			<Route exact path="/signin" component={SignIn} />
			<Route exact path="/signup" component={SignUp} />
			<ProtectedRoute
				isAuthenticated={user !== null}
				exact={true}
				path="/collection"
			>
				<Collection />
			</ProtectedRoute>
			<ProtectedRoute
				isAuthenticated={user !== null}
				exact={true}
				path="/collection/add"
			>
				<AddSpirit />
			</ProtectedRoute>

			<ProtectedRoute
				isAuthenticated={user !== null}
				exact={true}
				path="/profile"
			>
				<Profile />
			</ProtectedRoute>
			<Route
				exact
				path="/detail/:cocktailId"
				component={CocktailDetail}
			></Route>
		</>
	);
};

export default Content;

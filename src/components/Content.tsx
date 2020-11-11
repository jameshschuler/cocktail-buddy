import React, { useContext, useState } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { APIDetail, APIDrink, Cocktail } from '../models/api/cocktail';
import CocktailDetail from './CocktailDetail';
import AddSpirit from './collection/AddSpirit';
import Collection from './collection/Collection';
import ProtectedRoute from './helpers/ProtectedRoute';
import Profile from './Profile';
import Search from './Search';
import SearchResults from './SearchResults';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Content: React.FC = () => {
	const [results, setResults] = useState<Cocktail[]>([]);
	const [filteredResults, setFilteredResults] = useState<Cocktail[]>([]);
	const [searchedSpirit, setSearchedSpirit] = useState('');
	const userContext = useContext(UserContext);

	const filterResultsCallback = (query: string) => {
		if (results.length === 0) {
			return;
		}

		if (query === '') {
			setFilteredResults(results);
			return;
		}

		const filtered = results.filter((result: Cocktail) => {
			return result.name.toLowerCase().includes(query.toLowerCase());
		});

		setFilteredResults(filtered);
		setSearchedSpirit(query);
	};

	const searchCallback = (searchedSpirit: string, results: APIDetail) => {
		const cocktails = results.drinks.map((drink: APIDrink) => {
			return {
				id: drink.idDrink,
				name: drink.strDrink,
				thumbnail: drink.strDrinkThumb,
			} as Cocktail;
		}) as Cocktail[];

		setResults(cocktails);
		setFilteredResults(cocktails);
		setSearchedSpirit(searchedSpirit);
	};

	return (
		<div id="content">
			<Route exact path="/search">
				<Search
					callback={searchCallback}
					filterResultsCallback={filterResultsCallback}
				/>
				<SearchResults
					results={filteredResults}
					searchedSpirit={searchedSpirit}
				/>
			</Route>
			<Route exact path="/signin" component={SignIn} />
			<Route exact path="/signup" component={SignUp} />
			<ProtectedRoute
				isAuthenticated={userContext.user !== null}
				exact={true}
				path="/collection"
				component={Collection}
			/>
			<ProtectedRoute
				isAuthenticated={userContext.user !== null}
				exact={true}
				path="/collection/add"
				component={AddSpirit}
			/>
			<ProtectedRoute
				isAuthenticated={userContext.user !== null}
				exact={true}
				path="/profile"
				component={Profile}
			/>
			<Route
				exact
				path="/detail/:cocktailId"
				component={CocktailDetail}
			></Route>
		</div>
	);
};

export default Content;

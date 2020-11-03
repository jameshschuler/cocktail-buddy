import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { APIDetail, APIDrink, Cocktail } from '../api/cocktail';
import CocktailDetail from './CocktailDetail';
import Search from './Search';
import SearchResults from './SearchResults';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Content: React.FC = () => {
	const [results, setResults] = useState<Cocktail[]>([]);
	const [filteredResults, setFilteredResults] = useState<Cocktail[]>([]);
	const [searchedSpirit, setSearchedSpirit] = useState('');

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
			<Route
				exact
				path="/detail/:cocktailId"
				component={CocktailDetail}
			></Route>
			{/* <Route>
				<Search
					callback={searchCallback}
					filterResultsCallback={filterResultsCallback}
				/>
				<SearchResults
					results={filteredResults}
					searchedSpirit={searchedSpirit}
				/>
			</Route> */}
		</div>
	);
};

export default Content;

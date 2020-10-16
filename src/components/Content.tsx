import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { APIDetail, APIDrink, Cocktail } from '../api/cocktail';
import CocktailDetail from './CocktailDetail';
import Search from './Search';
import SearchResults from './SearchResults';

const Content: React.FC = () => {
	const [results, setResults] = useState<Cocktail[]>([]);
	const [searchedSpirit, setSearchedSpirit] = useState('');

	const searchCallback = (searchedSpirit: string, results: APIDetail) => {
		console.log(results);
		const cocktails = results.drinks.map((drink: APIDrink) => {
			return {
				id: drink.idDrink,
				name: drink.strDrink,
				thumbnail: drink.strDrinkThumb,
			} as Cocktail;
		}) as Cocktail[];

		setResults(cocktails);
		setSearchedSpirit(searchedSpirit);
	};

	return (
		<div id="content">
			<Route exact path="/">
				<Search callback={searchCallback} />
				<SearchResults
					results={results}
					searchedSpirit={searchedSpirit}
				/>
			</Route>
			<Route
				exact
				path="/detail/:cocktailId"
				component={CocktailDetail}
			></Route>
		</div>
	);
};

export default Content;

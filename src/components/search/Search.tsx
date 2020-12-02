import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/AppContext';
import { Action, search } from '../../service/searchService';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
	const { setSearchResults, filterResults } = useContext(UserContext);
	const [spirits, setSpirits] = useState([
		{ label: 'Bourbon', value: 'bourbon' },
		{ label: 'Brandy', value: 'brandy' },
		{ label: 'Cognac', value: 'cognac' },
		{ label: 'Gin', value: 'gin' },
		{ label: 'Mezcal', value: 'mezcal' },
		{ label: 'Rum', value: 'rum' },
		{ label: 'Scotch', value: 'scotch' },
		{ label: 'Tequila', value: 'tequila' },
		{ label: 'Vermouth', value: 'vermouth' },
		{ label: 'Vodka', value: 'vodka' },
	]);

	useEffect(() => {
		onChange('bourbon');
	}, []);

	const onChange = async (spirit: string) => {
		const results = await search(Action.Filter, spirit);
		setSearchResults(results);
	};

	return (
		<div id="search">
			<form>
				<fieldset>
					<label htmlFor="spirit-selector">Spirit</label>
					<select
						id="spirit-selector"
						name="spirit"
						onChange={(e: any) => onChange(e.target.value)}
					>
						{spirits.map((option, index) => {
							return (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</select>
				</fieldset>
				<fieldset>
					<label htmlFor="filter-by">Filter by</label>
					<input
						id="filter-by"
						placeholder="Cocktail name..."
						name="filter"
						onChange={(e: any) => filterResults(e.target.value)}
					/>
				</fieldset>
			</form>
		</div>
	);
};

export default Search;

import React, { useEffect } from 'react';
import { spiritOptions } from '../../models/data/data';
import { Action, search } from '../../service/searchService';
import { useStoreActions } from '../../store/storeModel';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
	const setSearchResults = useStoreActions(
		(actions) => actions.setSearchResults
	);
	const filterResults = useStoreActions((actions) => actions.filterResults);

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
						{spiritOptions.map((option, index) => {
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

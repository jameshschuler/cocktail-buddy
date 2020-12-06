import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cocktail } from '../../models/api/cocktail';
import { useStoreState } from '../../store/storeModel';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = () => {
	const [results, setResults] = useState<Cocktail[]>([]);
	const filteredResults = useStoreState((state) => state.filteredResults);
	const searchResults = useStoreState((state) => state.searchResults);
	const query = useStoreState((state) => state.query);

	useEffect(() => {
		if (filteredResults.length !== 0 || query !== '') {
			setResults(filteredResults);
		} else {
			setResults(searchResults);
		}
	}, [searchResults, filteredResults]);

	return (
		<>
			{results.length !== 0 && (
				<h4 id="total-results">Results: {results.length}</h4>
			)}
			<div id="search-results-container">
				{results.length === 0 ? (
					<div id="no-results-message">
						{query !== ''
							? `No Results found for '${query}'`
							: 'Select a spirit and click search to find cocktail recipes.'}
					</div>
				) : (
					<>
						{results.map((cocktail: Cocktail) => {
							return (
								<div key={cocktail.id} className="result">
									<Link to={`detail/${cocktail.id}`}>
										<img
											className="thumbnail"
											src={cocktail.thumbnail}
											alt={cocktail.name}
										/>
									</Link>
									<span className="name">
										{cocktail.name}
									</span>
								</div>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};

export default SearchResults;

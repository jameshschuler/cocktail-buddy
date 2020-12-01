import React from 'react';
import { Link } from 'react-router-dom';
import { Cocktail } from '../../models/api/cocktail';

interface SearchResultsProps {
	results: Cocktail[];
	searchedSpirit: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	results,
	searchedSpirit,
}) => {
	return (
		<>
			{results.length !== 0 && (
				<h4 id="total-results">Results: {results.length}</h4>
			)}
			<div id="search-results-container">
				{results.length === 0 ? (
					<div id="no-results-message">
						{searchedSpirit !== ''
							? `No Results found for '${searchedSpirit}'`
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

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface CocktailDetailParams {
	cocktailId: string; // parameters will always be a string (even if they are numerical)
}

interface CocktailDetailProps
	extends RouteComponentProps<CocktailDetailParams> {}

const CocktailDetail: React.FC<CocktailDetailProps> = ({ match }) => {
	console.log('id', match.params.cocktailId);

	return (
		<div className="cocktail-detail">
			<p>test</p>
		</div>
	);
};

export default withRouter(CocktailDetail);

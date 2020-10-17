import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Action, convertToModel, getCocktailDetail } from '../api/api';
import { Cocktail, Ingredient } from '../api/cocktail';

interface CocktailDetailParams {
	cocktailId: string; // parameters will always be a string (even if they are numerical)
}

interface CocktailDetailProps
	extends RouteComponentProps<CocktailDetailParams> {}

const CocktailDetail: React.FC<CocktailDetailProps> = ({ match }) => {
	console.log('id', match.params.cocktailId);

	const [detail, setDetail] = useState<Cocktail | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadCocktailDetail = async (cocktailId: number) => {
			setLoading(true);
			const response = await getCocktailDetail(Action.Detail, cocktailId);
			const cocktail = convertToModel(response.drinks[0]);
			console.log(cocktail);
			setDetail(cocktail);
			setLoading(false);
		};

		loadCocktailDetail(parseInt(match.params.cocktailId));
	}, []);

	return (
		<div className="cocktail-detail">
			{detail ? (
				<>
					<h3>{detail.name}</h3>
					<img
						className="thumbnail"
						src={detail.thumbnail}
						alt={detail.name}
					/>
					<p>{detail.instructions}</p>
					<div className="ingredients">
						<h4>Ingredients</h4>
						<ul>
							{detail.ingredients.map(
								(ingredient: Ingredient, index: number) => {
									return ingredient.ingredient !== null ? (
										<li key={index}>
											{ingredient.ingredient} -{' '}
											{ingredient.measure}
										</li>
									) : null;
								}
							)}
						</ul>
					</div>
				</>
			) : (
				<>
					{loading ? (
						<div>Loading...</div>
					) : (
						<div className="error alert">
							Unable to find cocktail recipe. Please try again!
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default withRouter(CocktailDetail);

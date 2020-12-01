import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
	Action,
	convertToModel,
	getCocktailDetail,
} from '../../models/api/api';
import { Cocktail, Ingredient } from '../../models/api/cocktail';
import Loader from '../helpers/Loader';

interface CocktailDetailParams {
	cocktailId: string; // parameters will always be a string (even if they are numerical)
}

interface CocktailDetailProps
	extends RouteComponentProps<CocktailDetailParams> {}

const CocktailDetail: React.FC<CocktailDetailProps> = ({ match }) => {
	const [detail, setDetail] = useState<Cocktail | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadCocktailDetail = async (cocktailId: number) => {
			setLoading(true);
			const response = await getCocktailDetail(Action.Detail, cocktailId);
			const cocktail = convertToModel(response.drinks[0]);
			setDetail(cocktail);
			setLoading(false);
		};

		loadCocktailDetail(parseInt(match.params.cocktailId));
	}, []);

	return (
		<>
			<div className="breadcrumbs">
				<ul>
					<li>
						<Link to="/search">Search</Link>
					</li>
					<li className="divider">
						<i className="fas fa-fw fa-chevron-right"></i>
					</li>
					<li>Detail</li>
				</ul>
			</div>
			<div className="cocktail-detail">
				{detail ? (
					<>
						<div className="left">
							<h3 className="title">{detail.name}</h3>
							<div className="thumbnail">
								<img src={detail.thumbnail} alt={detail.name} />
							</div>
						</div>
						<div className="right">
							<div className="ingredients">
								<h4>Ingredients</h4>
								<ul>
									{detail.ingredients.map(
										(
											ingredient: Ingredient,
											index: number
										) => {
											return ingredient.ingredient !==
												null ? (
												<li key={index}>
													{ingredient.measure}{' '}
													{ingredient.ingredient}
												</li>
											) : null;
										}
									)}
								</ul>
							</div>
							<p className="instructions">
								{detail.instructions}
							</p>
						</div>
					</>
				) : (
					<>
						{loading ? (
							<Loader />
						) : (
							<div className="error alert">
								Unable to find cocktail recipe. Please try
								again!
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default withRouter(CocktailDetail);

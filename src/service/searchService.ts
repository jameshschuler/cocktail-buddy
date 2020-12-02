import { APIDetail, APIDrink, Cocktail, Ingredient } from '../models/api/cocktail';

export enum Action {
    Filter = 'filter',
    Detail = 'lookup',
    Random = 'random'
}
const devKey = 1;
const baseUrl = `https://www.thecocktaildb.com/api/json/v1/${devKey}/`;

export async function getRandomCocktail () {
    let response = await fetch( `${baseUrl}random.php` );
    let data = await response.json();

    console.log( data );
}

export async function search ( action: Action, spirit: string ) {
    let response = await fetch( `${baseUrl}${action}.php?i=${spirit}` );
    let data = await response.json();

    if ( data ) {
        const cocktails = data.drinks.map( ( drink: APIDrink ) => {
            return {
                id: drink.idDrink,
                name: drink.strDrink,
                thumbnail: drink.strDrinkThumb,
            } as Cocktail;
        } ) as Cocktail[];

        return cocktails;
    }

    return [];
}

export async function getCocktailDetail ( action: Action, id: number ): Promise<APIDetail> {
    let response = await fetch( `${baseUrl}${action}.php?i=${id}` );
    let data = await response.json();

    return data;
}

export function convertToModel ( apiDrink: APIDrink ): Cocktail {
    const {
        strCategory,
        idDrink,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strInstructions,
    } = apiDrink;

    const ingredients = [
        { ingredient: apiDrink.strIngredient1, measure: apiDrink.strMeasure1 },
        { ingredient: apiDrink.strIngredient2, measure: apiDrink.strMeasure2 },
        { ingredient: apiDrink.strIngredient3, measure: apiDrink.strMeasure3 },
        { ingredient: apiDrink.strIngredient4, measure: apiDrink.strMeasure4 },
        { ingredient: apiDrink.strIngredient5, measure: apiDrink.strMeasure5 },
        { ingredient: apiDrink.strIngredient6, measure: apiDrink.strMeasure6 },
        { ingredient: apiDrink.strIngredient7, measure: apiDrink.strMeasure7 },
        { ingredient: apiDrink.strIngredient8, measure: apiDrink.strMeasure8 },
        { ingredient: apiDrink.strIngredient9, measure: apiDrink.strMeasure9 },
        { ingredient: apiDrink.strIngredient10, measure: apiDrink.strMeasure10 },
        { ingredient: apiDrink.strIngredient11, measure: apiDrink.strMeasure11 },
        { ingredient: apiDrink.strIngredient12, measure: apiDrink.strMeasure12 },
        { ingredient: apiDrink.strIngredient13, measure: apiDrink.strMeasure13 },
        { ingredient: apiDrink.strIngredient14, measure: apiDrink.strMeasure14 },
        { ingredient: apiDrink.strIngredient15, measure: apiDrink.strMeasure15 },
    ] as Ingredient[];

    const cocktail = {
        category: strCategory,
        id: idDrink,
        name: strDrink,
        thumbnail: strDrinkThumb,
        alcoholic: strAlcoholic,
        instructions: strInstructions,
        ingredients
    } as Cocktail;

    return cocktail;
}
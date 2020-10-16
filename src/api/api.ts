import { APIDetail } from './cocktail';

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

    return data;
}

export async function getCocktailDetail ( action: Action, id: number ): Promise<APIDetail> {
    let response = await fetch( `${baseUrl}${action}.php?i=${id}` );
    let data = await response.json();

    return data;
}
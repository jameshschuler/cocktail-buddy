import { APIDetail } from './interfaces/cocktail';

export enum Action {
    Filter = 'filter',
    Detail = 'lookup',
    Random = 'random'
}
const devKey = 1;
const baseUrl = `https://www.thecocktaildb.com/api/json/v1/${devKey}/`;

const getRandomCocktail = async () => {
    let response = await fetch( `${baseUrl}random.php` );
    let data = await response.json();

    console.log( data );
}

export const search = async ( action: Action, spirit: string ) => {
    let response = await fetch( `${baseUrl}${action}.php?i=${spirit}` );
    let data = await response.json();

    return data;
}

export const getCocktailDetail = async ( action: Action, id: number ): Promise<APIDetail> => {
    let response = await fetch( `${baseUrl}${action}.php?i=${id}` );
    let data = await response.json();

    return data;
}
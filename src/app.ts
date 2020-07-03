import { Action, search } from './api';
import { Cocktail } from './interfaces/cocktail';
import { Option } from './interfaces/option';
import './styles/app.scss';

interface Spirit {
    name: string;
}

const spirits = [ { name: 'Gin' }, { name: 'Tequila' }, { name: 'Vodka' } ] as Array<Spirit>;
const searchForm = document.getElementById( 'search-form' ) as HTMLFormElement;


const populateSelect = ( id: string, options: Array<Option> ) => {
    const select = document.getElementById( id ) as HTMLSelectElement;

    if ( select && options && options.length > 0 ) {
        options.forEach( ( { text, value } ) => {
            let optionToAdd = document.createElement( 'option' ) as HTMLOptionElement;
            optionToAdd.text = text;
            optionToAdd.value = value;

            select.add( optionToAdd );
        } );
    }
}

interface APIDrink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

const parseSearchResult = ( response: any ): Cocktail[] => {
    if ( !response || !response.drinks ) {
        return [];
    }

    const drinks = response.drinks as APIDrink[];
    const cocktails = drinks.map( ( drink: APIDrink ) => {
        return {
            id: drink.idDrink,
            name: drink.strDrink,
            thumbnail: drink.strDrinkThumb
        } as Cocktail
    } ) as Cocktail[];

    return cocktails;
}

searchForm.addEventListener( 'submit', async ( e: any ) => {
    e.preventDefault();

    const data = new FormData( searchForm );
    const selectedSpirit = data.get( 'spiritSelector' );

    if ( selectedSpirit ) {
        const response = await search( Action.Filter, selectedSpirit.toString() );
        const cocktails = parseSearchResult( response );
        console.log( cocktails );
    }
} )

window.onload = () => {
    populateSelect( 'spirit-selector', spirits.map( ( spirit: Spirit ) => {
        return {
            text: spirit.name,
            value: spirit.name
        }
    } ) );
};
import { Action, search } from './api';
import { APIDrink, Cocktail } from './interfaces/cocktail';
import { Option } from './interfaces/option';
import { Spirit } from './interfaces/spirit';
import './styles/app.scss';

const spirits = [
    { name: 'Bourbon' },
    { name: 'Brandy' },
    { name: 'Cognac ' },
    { name: 'Gin' },
    { name: 'Mezcal' },
    { name: 'Rum' },
    { name: 'Scotch' },
    { name: 'Tequila' },
    { name: 'Vermouth' },
    { name: 'Vodka' } ] as Array<Spirit>;

const searchForm = document.getElementById( 'search-form' ) as HTMLFormElement;
const searchResultsContainer = document.getElementById( 'search-results-container' );
const resultsTitle = document.getElementById( 'results-title' );
const filterContainer = document.getElementById( 'filter-container' );

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

const populateSearchResults = ( cocktails: Cocktail[] ) => {
    filterContainer!.classList.add( 'hidden' );

    let content = '';

    if ( !cocktails || cocktails.length === 0 ) {
        content = `<div id="no-results-message">No cocktails found. Try a different liquor!</div>`;
    } else {
        resultsTitle!.innerText = `Results - ${cocktails.length}`;
        cocktails.forEach( ( cocktail: Cocktail ) => {
            let cocktailResult = `
                <div class="result" data-id="${cocktail.id}">
                    <img class="thumbnail" src="${cocktail.thumbnail}" alt="${cocktail.name}" />
                    <span class="name">${cocktail.name}</span>
                </div>`;

            content += cocktailResult;
        } );
        filterContainer!.classList.remove( 'hidden' );
    }

    searchResultsContainer!.innerHTML = content;
}

searchForm.addEventListener( 'submit', async ( e: any ) => {
    e.preventDefault();

    const data = new FormData( searchForm );
    const selectedSpirit = data.get( 'spiritSelector' );

    if ( selectedSpirit ) {
        const response = await search( Action.Filter, selectedSpirit.toString() );
        const cocktails = parseSearchResult( response );
        populateSearchResults( cocktails );
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
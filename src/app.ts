import { Action, getCocktailDetail, search } from './api';
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
const filterInput = document.getElementById( 'filter-input' ) as HTMLInputElement;
const closePopupButton = document.getElementById( 'close-popup-btn' ) as HTMLButtonElement;
const resetButton = document.getElementById( 'reset-button' ) as HTMLButtonElement;

const cocktailDetailPopup = document.getElementById( 'cocktail-detail-popup' );
const header = document.getElementById( 'cocktail-name' );

const searchResultsContainer = document.getElementById( 'search-results-container' );
const resultsTitle = document.getElementById( 'results-title' );
const filterContainer = document.getElementById( 'filter-container' );
const loader = document.getElementById( 'loader' );

let allresults = new Array<Cocktail>();
let filteredResults = new Array<Cocktail>();

const showPopup = () => {
    cocktailDetailPopup?.classList.remove( 'hidden' );
}

const closePopup = () => { cocktailDetailPopup?.classList.add( 'hidden' ); }

const populatePopup = ( cocktail: Cocktail ) => {
    header!.innerText = cocktail.name;
}

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

const parseSearchResult = ( response: any ): void => {
    if ( !response || !response.drinks ) {
        return;
    }

    const drinks = response.drinks as APIDrink[];
    const cocktails = drinks.map( ( drink: APIDrink ) => {
        return {
            id: drink.idDrink,
            name: drink.strDrink,
            thumbnail: drink.strDrinkThumb
        } as Cocktail
    } ) as Cocktail[];

    allresults = cocktails;
}

const clearSearchResults = () => {
    allresults = [];
    filteredResults = [];
    searchResultsContainer!.innerHTML = '';
    resultsTitle!.innerText = '';
    filterContainer!.classList.add( 'hidden' );
}

const populateSearchResults = ( cocktails: Cocktail[] ) => {
    searchResultsContainer!.innerHTML = '';
    resultsTitle!.innerText = `Results - ${cocktails.length}`;
    cocktails.forEach( ( cocktail: Cocktail ) => {
        const result = document.createElement( 'div' );
        result.classList.add( 'result' );
        result.dataset.id = cocktail.id;
        result.addEventListener( 'click', () => cocktailClicked( cocktail.id ) );

        let cocktailResult =
            `<img class="thumbnail" src="${cocktail.thumbnail}" alt="${cocktail.name}" />
                <span class="name">${cocktail.name}</span>`;

        result.innerHTML = cocktailResult;

        searchResultsContainer!.appendChild( result );
    } );

    filterContainer!.classList.remove( 'hidden' );
}

const cocktailClicked = async ( id: string ): Promise<void> => {
    const response = await getCocktailDetail( Action.Detail, parseInt( id ) );
    const detail = response.drinks[ 0 ];

    if ( !detail ) {
        // TODO: show error (maybe a toaster?)
        return;
    }

    const { strCategory, idDrink, strDrink, strDrinkThumb } = detail;

    const cocktail = {
        category: strCategory,
        id: idDrink,
        name: strDrink,
        thumbnail: strDrinkThumb
    } as Cocktail;

    populatePopup( cocktail );
    showPopup();
}


/**
 * Events
 */
filterInput.addEventListener( 'keyup', () => {
    const filterText = filterInput.value.toLocaleLowerCase();
    const filtered = allresults.filter( e => e.name.toLocaleLowerCase().includes( filterText ) );

    filteredResults = filtered;
    populateSearchResults( filteredResults );
} );

closePopupButton.addEventListener( 'click', () => closePopup() );

resetButton.addEventListener( 'click', () => {
    clearSearchResults();
} );

searchForm.addEventListener( 'submit', async ( e: any ) => {
    e.preventDefault();

    const data = new FormData( searchForm );
    const selectedSpirit = data.get( 'spiritSelector' );

    if ( selectedSpirit ) {
        loader?.classList.remove( 'hidden' );
        const response = await search( Action.Filter, selectedSpirit.toString() );
        parseSearchResult( response );

        if ( allresults.length === 0 ) {
            searchResultsContainer!.innerHTML = `<div id="no-results-message">No cocktails found. Try a different liquor!</div>`;
        } else {
            populateSearchResults( allresults );
        }

        loader?.classList.add( 'hidden' );
    }
} );

window.onload = () => {
    const selectOptions = spirits.map( ( spirit: Spirit ) => {
        return {
            text: spirit.name,
            value: spirit.name
        }
    } );

    populateSelect( 'spirit-selector', selectOptions );
};
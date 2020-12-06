import { action, Action, createStore, createTypedHooks } from 'easy-peasy';
import { Cocktail } from '../models/api/cocktail';
import { Message } from '../models/message';

export interface StoreModel {
    filteredResults: Cocktail[];
    message: Message | null;
    searchResults: Cocktail[];
    shouldReloadCollection: boolean;
    query: string;
    user: firebase.User | null;
    filterResults: Action<StoreModel, string>;
    setMessage: Action<StoreModel, Message | null>;
    setSearchResults: Action<StoreModel, Cocktail[]>;
    setShouldReloadCollection: Action<StoreModel, boolean>;
    setUser: Action<StoreModel, firebase.User | null>
}

export const store = createStore( {
    filteredResults: [],
    message: null,
    searchResults: [],
    shouldReloadCollection: false,
    query: '',
    user: null,
    filterResults: action( ( state: any, payload ) => {
        // TODO: look into computed property
        let filteredResults = [];
        if ( state.searchResults.length !== 0 && payload !== '' ) {
            filteredResults = state.searchResults.filter(
                ( result: Cocktail ) => {
                    return result.name
                        .toLowerCase()
                        .includes( payload.toLowerCase() );
                }
            );
        } else {
            payload = '';
        }

        state.query = payload;
        state.filteredResults = filteredResults;
    } ),
    setMessage: action( ( state: any, payload ) => {
        state.message = payload;
    } ),
    setSearchResults: action( ( state: any, payload ) => {
        state.searchResults = payload;
    } ),
    setShouldReloadCollection: action( ( state: any, payload ) => {
        state.shouldReloadCollection = payload;
    } ),
    setUser: action( ( state: any, payload ) => {
        state.user = payload;
    } ),
} );

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
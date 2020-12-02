import React, { createContext, useReducer } from 'react';
import { Cocktail } from '../models/api/cocktail';

export enum MessageType {
	error,
	success,
}

export type Message = {
	text: string;
	messageType: MessageType;
};

type AppState = {
	error?: string;
	filteredResults: Cocktail[];
	loading: boolean;
	message?: Message;
	searchResults: Cocktail[];
	shouldReloadCollection: boolean;
	query: string;
	user?: firebase.User;
	filterResults: Function;
	setUser: Function;
	setGlobalMessage: Function;
	setSearchResults: Function;
	setShouldReloadCollection: Function;
};

export enum Actions {
	FILTER_RESULTS = 'FILTER_RESULTS',
	SET_MESSAGE = 'SET_MESSAGE',
	SET_USER = 'SET_USER',
	SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
	SET_SHOULD_RELOAD_COLLECTION = 'SET_SHOULD_RELOAD_COLLECTION',
}

const initialState: AppState = {
	filteredResults: [],
	loading: false,
	shouldReloadCollection: false,
	searchResults: [],
	query: '',
	filterResults: (query: string) => {},
	setUser: () => {},
	setGlobalMessage: (message: string, messageType: MessageType) => {},
	setSearchResults: (searchResults: Cocktail[]) => {},
	setShouldReloadCollection: (shouldReloadCollection: boolean) => {},
};

function reducer(state: AppState, action: any) {
	switch (action.type) {
		case Actions.FILTER_RESULTS:
			return {
				...state,
				query: action.payload.query,
				filteredResults: action.payload.filteredResults,
			};
		case Actions.SET_USER:
			return {
				...state,
				user: action.payload.user,
			};
		case Actions.SET_MESSAGE:
			return {
				...state,
				message: action.payload.message,
			};
		case Actions.SET_SEARCH_RESULTS:
			return {
				...state,
				searchResults: action.payload.searchResults,
			};
		case Actions.SET_SHOULD_RELOAD_COLLECTION:
			return {
				...state,
				shouldReloadCollection: action.payload.shouldReloadCollection,
			};
		default:
			return state;
	}
}

const Provider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		filteredResults: state.filteredResults,
		loading: state.loading,
		shouldReloadCollection: state.shouldReloadCollection,
		searchResults: state.searchResults,
		query: state.query,
		filterResults: (query: string) => {
			let filteredResults = [];
			if (state.searchResults.length !== 0 && query !== '') {
				filteredResults = state.searchResults.filter(
					(result: Cocktail) => {
						return result.name
							.toLowerCase()
							.includes(query.toLowerCase());
					}
				);
			} else {
				query = '';
			}

			dispatch({
				type: Actions.FILTER_RESULTS,
				payload: {
					filteredResults,
					query,
				},
			});
		},
		setSearchResults: (searchResults: Cocktail[]) => {
			dispatch({
				type: Actions.SET_SEARCH_RESULTS,
				payload: { searchResults },
			});
		},
		setShouldReloadCollection: (shouldReloadCollection: boolean) => {
			dispatch({
				type: Actions.SET_SHOULD_RELOAD_COLLECTION,
				payload: { shouldReloadCollection },
			});
		},
		setUser: (user: firebase.User) => {
			dispatch({ type: Actions.SET_USER, payload: { user } });
		},
		setGlobalMessage: (text: string, messageType: MessageType) => {
			dispatch({
				type: Actions.SET_MESSAGE,
				payload: { message: { text, messageType } },
			});
		},
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export default Provider;

export const UserContext = createContext<AppState>(initialState);

import React, { createContext, useReducer } from 'react';

type AppState = {
	loading: boolean;
	shouldReloadCollection: boolean;
	user?: firebase.User;
	error?: string;
	setUser: Function;
	setGlobalError: Function;
	setShouldReloadCollection: Function;
};

export enum Actions {
	SET_USER = 'SET_USER',
	SET_ERROR = 'SET_ERROR',
	SET_SHOULD_RELOAD_COLLECTION = 'SET_SHOULD_RELOAD_COLLECTION',
}

const initialState: AppState = {
	loading: false,
	shouldReloadCollection: false,
	setUser: () => {},
	setGlobalError: (message: string) => {},
	setShouldReloadCollection: (shouldReloadCollection: boolean) => {},
};

function reducer(state: AppState, action: any) {
	switch (action.type) {
		case Actions.SET_USER:
			return {
				...state,
				user: action.payload.user,
			};
		case Actions.SET_ERROR:
			return {
				...state,
				error: action.payload.message,
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
		loading: state.loading,
		shouldReloadCollection: state.shouldReloadCollection,
		setShouldReloadCollection: (shouldReloadCollection: boolean) => {
			dispatch({
				type: Actions.SET_SHOULD_RELOAD_COLLECTION,
				payload: { shouldReloadCollection },
			});
		},
		setUser: (user: firebase.User) => {
			dispatch({ type: Actions.SET_USER, payload: { user } });
		},
		setGlobalError: (message: string) => {
			dispatch({ type: Actions.SET_ERROR, payload: { message } });
		},
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export default Provider;

export const UserContext = createContext<AppState>(initialState);

import React, { createContext, useReducer } from 'react';

type AppState = {
	loading: boolean;
	user?: firebase.User;
	error?: string;
	setUser: Function;
	setError: Function;
};

export enum Actions {
	SET_USER = 'SET_USER',
	SET_ERROR = 'SET_ERROR',
}

const initialState: AppState = {
	loading: false,
	setUser: () => {},
	setError: (message: string) => {},
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
		default:
			return state;
	}
}

const Provider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		loading: state.loading,
		setUser: (user: firebase.User) => {
			dispatch({ type: Actions.SET_USER, payload: { user } });
		},
		setError: (message: string) => {
			dispatch({ type: Actions.SET_ERROR, payload: { message } });
		},
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export default Provider;

export const UserContext = createContext<AppState>(initialState);

import { createContext } from 'react';

type ErrorContextType = {
    message: string | null;
}

export const ErrorContext = createContext<ErrorContextType>( { message: null } );
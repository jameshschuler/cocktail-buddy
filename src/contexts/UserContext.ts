import { createContext } from 'react';

type UserContextType = {
    user: firebase.User | null
}

export const UserContext = createContext<UserContextType>( { user: null } );
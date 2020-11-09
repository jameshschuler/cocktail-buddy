import firebase from 'firebase';
import { auth } from '../App';

export async function signup ( email: string, password: string, rememberMe: boolean ): Promise<string | null> {
    try {
        if ( rememberMe ) {
            await auth.setPersistence( firebase.auth.Auth.Persistence.LOCAL )
        } else {
            await auth.setPersistence( firebase.auth.Auth.Persistence.SESSION )
        }

        await auth.createUserWithEmailAndPassword( email, password );
        return null;
    } catch ( error ) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
    }
}

export async function signin ( email: string, password: string, rememberMe: boolean ): Promise<string | null> {
    try {
        if ( rememberMe ) {
            await auth.setPersistence( firebase.auth.Auth.Persistence.LOCAL )
        } else {
            await auth.setPersistence( firebase.auth.Auth.Persistence.SESSION )
        }

        await auth.signInWithEmailAndPassword( email, password );
        return null;
    } catch ( error ) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
    }
}
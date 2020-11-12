import { auth, firestore } from 'firebase';
import { CustomError } from '../models/error';
import { Spirit } from '../models/spirit';

export async function addSpirit ( spirit: Spirit ): Promise<CustomError | null> {
    const db = firestore();
    const userId = auth().currentUser?.uid;

    if ( !userId ) {
        return {
            code: 'Unauthorized',
            message: 'Unauthorized'
        }
    }

    spirit.userId = userId;

    try {
        await db.collection( 'collections' ).add( spirit );
        return null;
    } catch ( error ) {
        return {
            code: error.code,
            message: error.message
        };
    }
}

export async function loadCollection (): Promise<Spirit[]> {
    const db = firestore();
    const userId = auth().currentUser?.uid;

    if ( !userId ) {
        return [];
    }

    try {
        const querySnapshot = await db.collection( 'collections' ).where( 'userId', '==', userId ).get();
        const collection = new Array<Spirit>();

        querySnapshot.forEach( ( doc: any ) => {
            collection.push( {
                ...doc.data()
            } );
        } );

        return collection;
    } catch ( error ) {
        return [];
    }
}
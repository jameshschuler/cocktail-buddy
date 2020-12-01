import firebase from 'firebase';
import { auth, firestore } from '../App';
import { CustomError } from '../models/error';
import { Spirit } from '../models/spirit';

export async function addSpirit ( spirit: Spirit ): Promise<CustomError | null> {
    if ( spirit.description && spirit.description.length > 500 ) {
        return {
            code: 'VALIDATION_ERROR',
            message: 'Description cannot be longer than 500 characters.',
        }
    }

    const db = firestore;
    const userId = auth.currentUser?.uid;

    if ( !userId ) {
        return {
            code: 'Unauthorized',
            message: 'Unauthorized'
        }
    }

    spirit.userId = userId;

    try {
        const imageUrl = await uploadImage( spirit.img );
        if ( imageUrl ) {
            spirit.imageUrl = imageUrl as string;
        }
        delete spirit.img;

        await db.collection( 'collections' ).add( spirit );
        return null;

    } catch ( error ) {
        return {
            code: error.code,
            message: error.message
        };
    }
}

export async function deleteSpirit ( id: string ) {
    const db = firestore;
    const userId = auth.currentUser?.uid;

    if ( !userId ) {
        return {
            code: 'Unauthorized',
            message: 'Unauthorized'
        }
    }

    try {
        const query = db.collection( 'collections' ).doc( id );
        await query.delete();
    } catch ( error ) {
        return {
            code: error.code,
            message: error.message
        };
    }
}

function uploadImage ( img: any ) {
    if ( !img ) return;
    return new Promise( ( resolve, reject ) => {
        const storage = firebase.storage();
        const fileName = img[ '0' ].name;
        const uploadTask = storage.ref( `/images/${fileName}` ).put( img[ '0' ] );

        uploadTask.on( 'state_changed',
            ( snapShot ) => { },
            ( error ) => {
                reject( {
                    code: error.name,
                    message: error.message
                } )
            }, async () => {
                const imageUrl = await storage.ref( 'images' ).child( fileName ).getDownloadURL();
                resolve( imageUrl );
            } );
    } );
}

export async function loadCollection (): Promise<Spirit[]> {
    const db = firestore;
    const userId = auth.currentUser?.uid;

    if ( !userId ) {
        return [];
    }

    try {
        const querySnapshot = await db.collection( 'collections' ).where( 'userId', '==', userId ).get();
        const collection = new Array<Spirit>();

        querySnapshot.forEach( ( doc: firebase.firestore.DocumentData ) => {
            collection.push( {
                ...doc.data(),
                id: doc.id
            } );
        } );

        return collection;
    } catch ( error ) {
        return [];
    }
}
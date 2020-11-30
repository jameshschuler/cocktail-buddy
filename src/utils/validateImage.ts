export function validateImage ( value: any ) {
    // TODO: validate file size
    if ( value && value[ '0' ] ) {
        const size = value[ '0' ].size;
        if ( size > 1000000 ) {
            return false;
        }

        const type: string = value[ '0' ].type;
        if (
            ![
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/gif',
            ].includes( type )
        ) {
            return false;
        }
    }
    return true;
}
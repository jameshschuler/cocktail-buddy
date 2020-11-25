export function validateImage ( value: any ) {
    // TODO: validate file size
    if ( value && value[ '0' ] ) {
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
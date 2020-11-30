export interface Spirit {
    id?: string;
    brand: string;
    name: string;
    description?: string;
    tastingNotes: string[];
    quantity: string;
    type: string;
    userId?: string;
    img?: any;
    imageUrl?: string;
}

export enum SpiritType {
    Bourbon,
    Brandy,
    Cognac,
    Gin,
    Mezcal,
    Rum,
    Scotch,
    Tequila,
    Vermouth,
    Vodka
}

// Helper
const StringIsNumber = ( value: any ) => isNaN( Number( value ) ) === false;

// Turn enum into array
export function ToArray ( enumme: any ) {
    return Object.keys( enumme )
        .filter( StringIsNumber )
        .map( key => enumme[ key ] ).sort();
}
export interface Spirit {
    name: string;
    quantity: string;
    type: string;
    userId?: string;
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
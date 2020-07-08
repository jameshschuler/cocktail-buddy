export interface Cocktail {
    id: string;
    name: string;
    thumbnail: string;
    detail?: CocktailDetail
}

export interface CocktailDetail {

}

export interface APIDrink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}
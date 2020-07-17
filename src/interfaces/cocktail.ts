export interface Cocktail {
    category: string;
    glass: string;
    id: string;
    ingredients: string[];
    instructions: string;
    name: string;
    steps: string[];
    tags: string;
    thumbnail?: string;
    video?: string;
}

export interface APIDrink {
    dateModified: string;
    idDrink: string;
    strAlcoholic: string;
    strCategory: string;
    strCreativeCommonsConfirmed: string;
    strDrink: string;
    strDrinkAlternate?: any;
    strDrinkThumb: string;
    strGlass: string;
    strIBA?: any;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6?: any;
    strIngredient7?: any;
    strIngredient8?: any;
    strIngredient9?: any;
    strIngredient10?: any;
    strIngredient11?: any;
    strIngredient12?: any;
    strIngredient13?: any;
    strIngredient14?: any;
    strIngredient15?: any;
    strInstructions: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6?: any;
    strMeasure7?: any;
    strMeasure8?: any;
    strMeasure9?: any;
    strMeasure10?: any;
    strMeasure11?: any;
    strMeasure12?: any;
    strMeasure13?: any;
    strMeasure14?: any;
    strMeasure15?: any;
    strTags?: any;
    strVideo?: any;
}

export interface APIDetail {
    drinks: APIDrink[];
}
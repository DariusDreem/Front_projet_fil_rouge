export type IPokemon = {
    id: number;
    name: {
        fr: string;
        en?: string;
        jp?: string;
    };
    category: string;
    sprites: {
        regular: string;
        shiny: string;
        gmax?: string;
    };
    gender: "Male" | "Female" | "Unknown";
    type: string[]; // ou tu peux aussi renommer ça en `types` si c'est un tableau de string
    natures: string[];
    shiny: boolean;
    IV: {
        health: number;
        attack: number;
        defense: number;
        speed: number;
        specialAttack: number;
        specialDefense: number;
    };
    EV: {
        [key: string]: number;
    };
};

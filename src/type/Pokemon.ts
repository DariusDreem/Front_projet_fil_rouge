export type IPokemon = {
    id: number;
    name: string;
    category: string;
    sprite: [
        regular: string,
        shiny: string,
        gmax: string,
    ]
    gender: "Male" | "Female" | "Unknown";
    type: string[];
    natures: string[];
    shiny: boolean;
    IV: [
        health: number,
        attack: number,
        defense: number,
        speed: number,
        specialAttack: number,
        specialDefense: number
    ];
    EV: {
        [key: string]: number;
    };
}

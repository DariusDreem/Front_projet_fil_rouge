export type IPokemon = {
    name: string;
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

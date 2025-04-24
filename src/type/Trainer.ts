import { IPokemon } from "./Pokemon.ts";

export type ITrainer = {
    picture: string;
    name: string;
    age?: number;
    Pokedollars?: number;
    badges?: string[];
    gender?: "Male" | "Female";
    catchedPokemons?: IPokemon[];
    PokemonTeam?: IPokemon[];
};
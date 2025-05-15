import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITrainer } from "../../type/Trainer";
import { IPokemon } from "../../type/Pokemon";

const initialState: ITrainer[] = [
    {
        picture: "https://i.kinja-img.com/image/upload/7bca6663c23a82b79c367ba087304233.jpg",
        name: "Ash Ketchum",
        age: 10,
        Pokedollars: 1000,
        badges: [],
        gender: "Male",
        catchedPokemons: [],
        PokemonTeam: [],
    },
    {
        picture: "",
        name: "Misty",
        age: 12,
        Pokedollars: 2000,
        badges: [],
        gender: "Female",
        catchedPokemons: [],
        PokemonTeam: [],
    },
];

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        setTrainer: (state, action: PayloadAction<ITrainer>) => {
            return { ...state, ...action.payload };
        },
        addPokemonToTeam: (state, action: PayloadAction<{ pokemon: IPokemon, trainerId: number }>) => {
            (state[action.payload.trainerId].PokemonTeam ??= []).push(action.payload.pokemon);
        },
        removePokemonFromTeam: (state, action: PayloadAction<{ trainerId: number, pokemonId: number }>) => {
            state[action.payload.trainerId].PokemonTeam = (state[action.payload.trainerId].PokemonTeam ?? []).filter((_: any, index: number) => index !== action.payload.pokemonId);
        },
        addCatchedPokemon: (state, action: PayloadAction<{ trainerId: number, pokemon: IPokemon }>) => {
            (state[action.payload.trainerId].catchedPokemons ??= []).push(action.payload.pokemon);
        },
        removeCatchedPokemon: (state, action: PayloadAction<{ trainerId: number, pokemonId: number }>) => {
            state[action.payload.trainerId].catchedPokemons = (state[action.payload.trainerId].catchedPokemons ?? []).filter((_: any, index: number) => index !== action.payload.pokemonId);
        },
    },
});

export const { setTrainer, addPokemonToTeam, removePokemonFromTeam } = trainerSlice.actions;
export default trainerSlice.reducer;
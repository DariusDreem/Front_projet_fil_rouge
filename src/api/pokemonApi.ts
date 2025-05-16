import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPokemon } from '../type/Pokemon';
import { ITrainer } from '../type/Trainer';

export const pokemonApi = createApi({
    baseurl: '',
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tyradex.vercel.app/api/v1/' }),
    tagTypes: ['PokemonGen'],

    endpoints: (builder) => ({
        getGen: builder.query<IPokemon[], number>({
            query: (gen) => `gen/${gen}`,
            providesTags: () => ['PokemonGen'], // Cache the result for later use
        }),

        getPokemon: builder.query<IPokemon, string>({
            query: (id) => `pokemon/${id}`,
        }),

        fakeApiPost: builder.mutation<number, number>({
            query: (id) => ({
                url: `pokemon/${id}`,
                method: 'POST',
                body: { id },
            }),
            invalidatesTags: ['PokemonGen'], // Invalidate the cache for the PokemonGen tag
        }),
    }),
});

export const { useGetGenQuery, useGetPokemonQuery, useFakeApiPostMutation } = pokemonApi;
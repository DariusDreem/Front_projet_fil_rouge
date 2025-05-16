import { configureStore } from "@reduxjs/toolkit";

import trainerSlice from "./slices/trainer-slice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../api/pokemonApi";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

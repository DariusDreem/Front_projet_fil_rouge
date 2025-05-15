import { configureStore } from "@reduxjs/toolkit";

import trainerSlice from "./slices/trainer-slice";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

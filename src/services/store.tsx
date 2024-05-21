import { configureStore } from '@reduxjs/toolkit'
import {baseApi} from "./baseApi.ts";
import {ratedMoviesSlice} from "./movie/movies.slice.ts";
import {loadState, saveState} from "../utils/localStorage-utils.tsx";

const preloadedState = loadState();

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [ratedMoviesSlice.name]: ratedMoviesSlice.reducer,
    },
    preloadedState: preloadedState ? { ratedMovies: preloadedState } : undefined,
})

store.subscribe(() => {
    saveState({
        ratedMovies: store.getState().ratedMovies.ratedMovies,
        movieRatings: store.getState().ratedMovies.movieRatings,
    });
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
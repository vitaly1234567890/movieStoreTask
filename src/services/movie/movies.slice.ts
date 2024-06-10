import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movies} from "./movies.types.ts";

export type RatedMoviesState = {
    ratedMovies: Movies[] ,
    movieRatings: {
        [movieId: string]: number;
    },
}

const initialState: RatedMoviesState = {
    ratedMovies: [],
    movieRatings: {},
};

export const ratedMoviesSlice = createSlice({
    name: 'ratedMovies',
    initialState,
    reducers: {
        addRatedMovies: (state, action: PayloadAction<{ movieId: string, rating: number, movieData: Movies }>) => {
            const {movieId, rating, movieData} = action.payload;
            const existingMovie = state.ratedMovies.find(movie => movie.id === movieData.id);
            if (!existingMovie) {
                state.ratedMovies.push(movieData);
            }
            state.movieRatings[movieId] = rating;
        },
        removeRatedMovies: (state, action: PayloadAction<{ movieId: string}>) => {
            const {movieId} = action.payload
            const index = state.ratedMovies.findIndex(movie => movie.id === +movieId);
            if (index !== -1) {
                state.ratedMovies.splice(index, 1);
            }
            delete state.movieRatings[movieId];
        },
    },
});

export const {addRatedMovies, removeRatedMovies} = ratedMoviesSlice.actions;

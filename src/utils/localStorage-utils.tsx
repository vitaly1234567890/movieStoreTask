import {RatedMoviesState} from "../services/movie/movies.slice.ts";


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('rated-movies-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as RatedMoviesState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: RatedMoviesState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('rated-movies-state', serializedState);
    } catch {
        // ignore write errors
    }
};
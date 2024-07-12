import {createBrowserRouter,} from "react-router-dom";
import App from "../App.tsx";
import {NotFound} from "../components/404/404.tsx";
import {MoviesList} from "../components/moviesList/moviesList.tsx";
import {RatedMovies} from "../components/ratedMovies/ratedMovies.tsx";
import {MantineProvider} from "@mantine/core";
import {Path} from "./pathRoute.tsx";
import {MovieCardBig} from "../components/movieCardBig/movieCardBig.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <MantineProvider>
            <App />
            </MantineProvider>,
        errorElement: <NotFound/>,
        children: [
            {
                path:'/',
                element: <MoviesList />
            },
            {
                path: Path.Movies,
                element: <MoviesList />
            },
            {
                path: Path.RatedMovies,
                element: <RatedMovies />
            },
            {
                path: Path.OneMovie,
                element: <MovieCardBig />
            },
        ]
    },
]);
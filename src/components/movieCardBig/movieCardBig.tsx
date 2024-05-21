import {useGetBigMoviesQuery} from "../../services/movie/movies.services.ts";
import {MovieCard} from "./movieCard/movieCard.tsx";
import s from './movieCardBig.module.scss'
import {MovieDescription} from "./movieDescription/movieDescription.tsx";
import {useParams} from "react-router-dom";

export const MovieCardBig = () => {
    const {id} = useParams()
    const moviedId = id || ''
    const {data} = useGetBigMoviesQuery({movie_id: +moviedId, language: "en-US"})
    console.log(data)

    return (
        <div className={s.root}>
            <div className={s.container}>
                <p className={s.title}>Movies / {data?.original_title}</p>
                {data && <MovieCard data={data}/>}
                <div className={s.contentWrapper}>
                    {data && <MovieDescription data={data}/>}
                </div>
            </div>
        </div>
    );
};

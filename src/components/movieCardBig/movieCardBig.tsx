import {useGetBigMoviesQuery} from "../../services/movie/movies.services.ts";
import {MovieCardInfo} from "./movieCardInfo/movieCardInfo.tsx";
import s from './movieCardBig.module.scss'
import {MovieDescription} from "./movieDescription/movieDescription.tsx";
import {useParams} from "react-router-dom";

export const MovieCardBig = () => {
    const {id} = useParams()
    const movieId = id || ''
    const {data} = useGetBigMoviesQuery({movie_id: +movieId, language: "en-US"})

    return (
        <div className={s.root}>
            <div className={s.container}>
                <p className={s.title}>Movies / {data?.original_title}</p>
                {data && <MovieCardInfo data={data}/>}
                <div className={s.contentWrapper}>
                    {data && <MovieDescription data={data}/>}
                </div>
            </div>
        </div>
    );
};

import s from './movieDescription.module.scss'
import {RootBigMovies} from "../../../services/movie/movies.types.ts";

type Props = {
    data: RootBigMovies
}
export const MovieDescription = ({data}: Props) => {

    return (
        <div className={s.root}>
            <div className={s.mainContent}>
                <p className={s.heading}>Trailer</p>
                <div>
                    <iframe
                        title="Movie Trailer"
                        width="500"
                        height="281"
                        src={`#`}
                        frameBorder="9"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={s.line}></div>
                <p className={s.heading}>Description</p>
                <div>{data?.overview}</div>
                <div className={s.line}></div>
                <p className={s.heading}>Production</p>
                {data?.production_companies.map(el => {
                    return (
                        <div key={el.id} className={s.production}>
                            <img className={s.img}
                                 src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${el.logo_path}`} alt={''}/>
                            <span className={s.title}>{el.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

import s from './movieCardSmall.module.scss'
import {Movies, RootGenres} from "../../../services/movie/movies.types.ts";
import {Icons} from "../../../assets/icons/icons.tsx";
import {NavLink} from "react-router-dom";

type Props = {
    data: Movies
    genre: RootGenres | undefined
}

export function formatNumber(number: number) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + number).length / 4);
    let shortNumber = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
    if (shortNumber % 1 !== 0) {
        shortNumber = +shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixNum];
}

export const MovieCardSmall = ({data, genre}: Props) => {

    const genreArray =
        genre?.genres.filter(el => data.genre_ids.includes(el.id)).map(el => el.name).join(', ');

    return (
        <NavLink to={`/movies/${data.id}`}>
            <div className={s.root}>
                <div className={s.mainContent}>
                    {data.poster_path ? (<img className={s.img}
                                              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                                              alt={''}/>) :
                        <div className={`${s.posterWrap} ${s.centered}`}><Icons iconId={'noPoster'} width="57"
                                                                                height="44" viewBox="0 0 57 44"/></div>}
                    <div className={s.content}>
                        <div>
                            <div className={s.title}>{data.title}</div>
                            <div className={s.release_date}>{data.release_date.slice(0, 4)}</div>
                            <div className={s.rating}>
                                <span><Icons iconId={'star'} width={'26'} height={'25'} viewBox={'0 0 26 25'}/> </span>
                                <span className={s.ratingGrade}>{data.vote_average.toFixed(1)} </span>
                                <span className={s.voteCount}> ({formatNumber(data.vote_count)})</span>
                            </div>
                        </div>
                        <div><span className={s.genre}>Genres</span> {genreArray}</div>
                    </div>
                    <div>rating2</div>
                </div>
            </div>
        </NavLink>

    );
};


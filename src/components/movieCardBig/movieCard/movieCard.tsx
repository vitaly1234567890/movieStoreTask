import s from "./movieCard.module.scss";
import {Icons} from "../../../assets/icons/icons.tsx";
import {formatNumber} from "../../moviesList/movieCardSmall/movieCardSmall.tsx";
import {RootBigMovies} from "../../../services/movie/movies.types.ts";

type Props = {
    data: RootBigMovies | undefined
}

export const MovieCard = ({data}: Props) => {

    function formatMinutes(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours + 'h ' + remainingMinutes + 'm';
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className={s.root}>
            <div className={s.mainContent}>
                {data?.poster_path ? (<img className={s.img}
                                           src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`}
                                           alt={''}/>) :
                    <div className={`${s.posterWrap} ${s.centered}`}><Icons iconId={'noPoster'} width="57"
                                                                            height="44" viewBox="0 0 57 44"/></div>}
                <div className={s.content}>
                    <div className={s.title}>{data?.title}</div>
                    <div className={s.release_date}>{data?.release_date.slice(0, 4)}</div>
                    <div className={s.rating}>
                        <span><Icons iconId={'star'} width={'26'} height={'25'} viewBox={'0 0 26 25'}/> </span>
                        <span className={s.ratingGrade}>{data?.vote_average.toFixed(1)} </span>
                        <span className={s.voteCount}> ({data && formatNumber(data.vote_count)})</span>
                    </div>
                    <div className={s.descriptionsContainer}>
                        <div className={s.container}>
                            <span className={s.description}>Duration</span>
                            <span className={s.descriptionOptions}>{data && formatMinutes(data.runtime)}</span>
                        </div>
                        <div className={s.container}>
                            <span className={s.description}>Premiere</span>
                            <span className={s.descriptionOptions}>{data && formatDate(data.release_date)}</span>
                        </div>
                        <div className={s.container}>
                            <span className={s.description}>Budget</span>
                            <span className={s.descriptionOptions}>{'$' + (data?.budget || 0).toLocaleString()}</span>
                        </div>
                        <div className={s.container}>
                            <span className={s.description}>Gross worldwide</span>
                            <span className={s.descriptionOptions}>{'$' + (data?.revenue || 0).toLocaleString()}</span>
                        </div>
                        <div className={s.container}>
                            <span className={s.description}>Genres</span>
                            <span className={s.descriptionOptions}>{data?.genres.map(el => el.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
                <div>rating2</div>
            </div>
        </div>
    );
};

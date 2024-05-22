import s from './movieListItem.module.scss'
import {Movies, RootGenres} from "../../../services/movie/movies.types.ts";
import {Icons} from "../../../assets/icons/icons.tsx";
import {NavLink} from "react-router-dom";
import {Button} from "../../ui/button/button.tsx";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addRatedMovies, removeRatedMovies} from "../../../services/movie/movies.slice.ts";
import {useDisclosure} from "@mantine/hooks";
import {Modal, Rating} from "@mantine/core";
import {AppDispatch, RootState} from "../../../services/store.tsx";
import {FormatNumber} from "../../../utils/formatNumber.tsx";

type Props = {
    data: Movies
    genre?: RootGenres
}

export const MovieListItem = ({data, genre}: Props) => {

    const dispatch: AppDispatch = useDispatch();
    const rating = useSelector((state: RootState) => state.ratedMovies.movieRatings[data.id]);

    const saveRating = (newRating: number) => {
        if(newRating > 0){
            dispatch(addRatedMovies({ movieData: data, rating: newRating, movieId: String(data.id)}));
        }
        close();
    };

    const removeRating = () => {
        dispatch(removeRatedMovies({movieId: String(data.id) }))
        close()
    }

    const genreArray = genre?.genres
        .filter((el) => data.genre_ids && data.genre_ids.includes(el.id))
        .map((el) => el.name)
        .join(", ");
    const releaseYear = data.release_date ? data.release_date.slice(0, 4) : ""
    const voteAverage = data.vote_average ? data.vote_average.toFixed(1) : "No vote"

    const [opened, { open, close }] = useDisclosure(false);
    const [ratingCount, setRatingCount] = useState(0);

const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    open()
}

    return (
        <div>
            <Modal size={'380'} radius={'8px'} centered opened={opened} onClose={close} title="Your rating">
                <div className={s.modalMain}>
                    <div className={s.line}></div>
                    <p className={s.titleModal}>{data.title}</p>
                    <Rating defaultValue={rating} size={'xl'} count={10} onChange={setRatingCount} value={ratingCount}/>
                    <div className={s.buttons}>
                        <Button variant={'primaryM'} children={'Save'} onClick={()=>saveRating(ratingCount)}/>
                        <Button className={s.buttonText} variant={'text'} children={'Remove rating'} onClick={removeRating}/>
                    </div>
                </div>
            </Modal>
            <NavLink to={`/movies/${data.id}`}>
                <div className={s.root}>
                    <div className={s.mainContent}>
                        {data.poster_path ? (<img className={s.img}
                                                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                                                  alt={''}/>) :
                            <div className={`${s.posterWrap} ${s.centered}`}><Icons iconId={'noPoster'} width="57"
                                                                                    height="44" viewBox="0 0 57 44"/>
                            </div>}
                        <div className={s.content}>
                            <div>
                                <div className={s.title}>{data.title}</div>

                                <div className={s.release_date}>{releaseYear}</div>
                                <div className={s.rating}>
                                    <span><Icons iconId={'star'} width={'26'} height={'25'}
                                                 viewBox={'0 0 26 25'}/> </span>
                                    <span className={s.ratingGrade}>{voteAverage} </span>
                                    <span className={s.voteCount}> ({FormatNumber(data.vote_count)})</span>
                                </div>
                            </div>
                            <div><span className={s.genre}>Genres</span> {genreArray}</div>
                        </div>
                        <div>
                                <div className={s.activeButton}>
                                    <Button
                                        className={s.Button}
                                        variant={'icon'}
                                        onClick={openModal}
                                        children={
                                            <Icons viewBox={"0 0 26 25"}
                                                   width={'26'}
                                                   height={'25'}
                                                   iconId={rating > 0 ? 'buttonIconActive' : 'buttonIcon'}/>
                                        }
                                    />
                                    {rating && <span className={s.titleModal}>{rating}</span>}
                                </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};


import s from "../../moviesList/movieListItem/movieListItem.module.scss";
import {Modal, Rating} from "@mantine/core";
import {Button} from "../button/button.tsx";
import {useState} from "react";
import {addRatedMovies, removeRatedMovies} from "../../../services/movie/movies.slice.ts";
import {AppDispatch} from "../../../services/store.tsx";
import {useDispatch} from "react-redux";
import {Movies, RootBigMovies} from "../../../services/movie/movies.types.ts";

type Props = {
    data: Movies | RootBigMovies
    rating: number
    opened: boolean
    close: ()=>void
}
export const CustomModal = ({data, rating, opened, close}: Props) => {
    const dispatch: AppDispatch = useDispatch();

    const [ratingCount, setRatingCount] = useState(rating);

    const saveRating = (newRating: number) => {
        if(newRating > 0){
            dispatch(addRatedMovies({ movieData: data as Movies, rating: newRating, movieId: String(data.id)}));
        }
        close();
    };

    const removeRating = () => {
        dispatch(removeRatedMovies({movieId: String(data.id) }))
        close()
    }

    return (
            <Modal size={'380'} radius={'8px'} centered opened={opened} onClose={close} title="Your rating">
                <div className={s.modalMain}>
                    <div className={s.line}></div>
                    <p className={s.titleModal}>{data.title}</p>
                    <Rating size={'xl'} count={10} onChange={setRatingCount} value={ratingCount}/>
                    <div className={s.buttons}>
                        <Button variant={'primaryM'} children={'Save'} onClick={()=>saveRating(ratingCount)}/>
                        <Button className={s.buttonText} variant={'text'} children={'Remove rating'} onClick={removeRating}/>
                    </div>
                </div>
            </Modal>
    );
};

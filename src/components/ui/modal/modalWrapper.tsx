import React from 'react';
import {CustomModal} from "./modal.tsx";
import s from "./modalWrapper.module.scss";
import {Button} from "../button/button.tsx";
import {Icons} from "../../../assets/icons/icons.tsx";
import {useDisclosure} from "@mantine/hooks";
import {Movies, RootBigMovies} from "../../../services/movie/movies.types.ts";

type Props = {
    data: Movies | RootBigMovies
    rating: number
}

export const ModalWrapper = ({data, rating}: Props) => {

    const [opened, {open, close}] = useDisclosure(false);
    const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        open()
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <CustomModal data={data} rating={rating} opened={opened} close={close}/>
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
    );
};
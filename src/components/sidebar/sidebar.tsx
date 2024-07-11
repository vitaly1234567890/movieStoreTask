import s from './sidebar.module.scss'
import {NavLink} from "react-router-dom";
import {Icons} from "../../assets/icons/icons.tsx";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Burger, Modal} from "@mantine/core";

export const Sidebar = () => {
    const [select, setSelect] = useState("")
    const [opened, {toggle, close}] = useDisclosure();

    const selectElement = (values: string)=> {
        setSelect(values)
        close()
    }

    const navElements = <>
        <NavLink to={'/movies'} onClick={() => selectElement('movies')}>
            <div
                className={`${opened && s.elementHide} ${s.element} ${select === 'movies' ? s.select : ""}`}> Movies
            </div>
        </NavLink>
        <NavLink to={'/ratedMovies'} onClick={() => selectElement('ratedMovies')}
                 className={select === 'ratedMovies' ? s.select : ""}>
            <div
                className={`${opened && s.elementHide} ${s.element} ${select === 'ratedMovies' ? s.select : ""}`}>Rated
                movies
            </div>
        </NavLink>
    </>

    return (
        <div className={s.root}>
            <NavLink to={'/'}>
                <div className={s.icon}>
                    <Icons iconId={"sidebar"}/>
                    <span className={s.sidebarTitle}>ArrowFlicks</span>
                </div>
            </NavLink>
            <div className={s.burger}>
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation"/>
            </div>
            {opened ? <Modal opened={opened} onClose={close} withCloseButton={false} yOffset={'9dvh'} size={"xs"}>
                    {navElements}
                </Modal>
                :
                <>
                    {navElements}
                </>
            }
        </div>
    );
};

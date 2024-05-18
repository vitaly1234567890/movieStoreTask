import s from './sidebar.module.scss'
import {NavLink} from "react-router-dom";
import {Icons} from "../../assets/icons/icons.tsx";
import {useState} from "react";

export const Sidebar = () => {
    const [select, setSelect] = useState("")
    console.log(select)
    return (
        <div className={s.root}>
            <NavLink to={'/'}>
                <div className={s.icon}>
                    <Icons iconId={"sidebar"}/>
                    <span className={s.sidebarTitle}>ArrowFlicks</span>
                </div>
            </NavLink>
            <NavLink to={'/movies'} onClick={() => setSelect('movies')}>
                <div className={`${s.element} ${select === 'movies' ? s.select : ""}`}> Movies</div>
            </NavLink>
            <NavLink to={'/ratedMovies'} onClick={() => setSelect('ratedMovies')}
                     className={select === 'ratedMovies' ? s.select : ""}>
                <div className={`${s.element} ${select === 'ratedMovies' ? s.select : ""}`}>Rated movie</div>
            </NavLink>
        </div>
    );
};

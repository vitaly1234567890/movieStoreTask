import s from './sidebar.module.scss'
import {NavLink} from "react-router-dom";

export const Sidebar = () => {
    return (
            <div className={s.root}>
                <NavLink to={'/movies'}>
                    <div className={s.element}> Movie</div>
                </NavLink>
                <NavLink to={'/ratedMovies'}>
                <div className={s.element}>Rated movie</div>
                </NavLink>
            </div>
    );
};

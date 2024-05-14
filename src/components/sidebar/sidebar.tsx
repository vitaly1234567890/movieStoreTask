import s from './sidebar.module.scss'
import {Icons} from "../../assets/icons/icons.tsx";
export const Sidebar = () => {
    return (
        <div className={s.root}>
            <div className={s.sidebar}>
                <Icons iconId={"sidebar"}/>
                <span className={s.sidebarTitle}>ArrowFlicks</span>
            </div>
            <div className={s.element}>Movie</div>
            <div className={s.element}>Rated movie</div>
        </div>
    );
};

import s from './sidebar.module.scss'
import {NavLink} from "react-router-dom";
import {Icons} from "../../assets/icons/icons.tsx";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Path} from "../../routes/pathRoute.tsx";
import {Burger, Menu} from "@mantine/core";

export const Sidebar = () => {
    const [select, setSelect] = useState("")
    const [opened, {toggle, close}] = useDisclosure();

    const selectElement = (values: string) => {
        setSelect(values)
        close()
    }

    const navElementMovie =
        <NavLink to={Path.Movies} onClick={() => selectElement('movies')}>
            <div
                className={`${opened && s.elementHide} ${s.element} ${select === 'movies' ? s.select : ""}`}> Movies
            </div>
        </NavLink>

    const navElementRatedMovies =
        <NavLink to={Path.RatedMovies} onClick={() => selectElement('ratedMovies')}
                 className={select === 'ratedMovies' ? s.select : ""}>
            <div
                className={`${opened && s.elementHide} ${s.element} ${select === 'ratedMovies' ? s.select : ""}`}>Rated
                movies
            </div>
        </NavLink>

    const DropdownMenu =
        <Menu width={180} shadow="md" onClose={close}>
            <Menu.Target>
                <div className={s.burger}>
                    <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation"/>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>
                    {navElementMovie}
                </Menu.Item>
                <Menu.Item>
                    {navElementRatedMovies}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>

    return (
        <div className={s.root}>
            <NavLink to={'/'} onClick={() => selectElement('movies')}>
                <div className={s.icon}>
                    <Icons iconId={"sidebar"}/>
                    <span className={s.sidebarTitle}>ArrowFlicks</span>
                </div>
            </NavLink>
            {DropdownMenu}
            {!opened ? <>{navElementMovie}
                {navElementRatedMovies}</> : ""}
        </div>
    );
};



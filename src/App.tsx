import './App.css'
import {Sidebar} from "./components/sidebar/sidebar.tsx";
import { Routes, Route, Navigate } from 'react-router-dom';
import {MoviesList} from "./components/moviesList/moviesList.tsx";
import {MovieCardBig} from "./components/movieCardBig/movieCardBig.tsx";

function App() {
    return (
            <div className='root'>
                <Sidebar/>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'movies'}/>}/>
                    <Route path={'/movies'} element={<MoviesList/>}/>
                    <Route path={'/ratedMovies'} element={<div>Yoyoy</div>}/>
                    <Route path={'/movies/:id'} element={<MovieCardBig />}/>
                    <Route path={'*'} element={<div>Error 404. Not found</div>}/>
                </Routes>
            </div>
    )
}

export default App

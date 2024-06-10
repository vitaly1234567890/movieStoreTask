import './App.css'
import {Sidebar} from "./components/sidebar/sidebar.tsx";
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {MoviesList} from "./components/moviesList/moviesList.tsx";
import {MovieCardBig} from "./components/movieCardBig/movieCardBig.tsx";
import {NotFound} from "./components/404/404.tsx";
import {RatedMovies} from "./components/ratedMovies/ratedMovies.tsx";

function App() {
    const location = useLocation();
    const showSidebar = location.pathname !== "/notfound";
    return (
            <div className='root'>
                    {showSidebar &&
                        <div className='sidebar'>
                            <Sidebar/>
                        </div>
                        }
                        <Routes>
                    <Route path={'/'} element={<Navigate to={'movies'}/>}/>
                    <Route path={'/movies'} element={<MoviesList/>}/>
                    <Route path={'/ratedMovies'} element={<RatedMovies />}/>
                    <Route path={'/movies/:id'} element={<MovieCardBig />}/>
                    <Route path='/notfound' element={<NotFound/>}/>
                    <Route path='*' element={<Navigate to="/notfound" />}/>
                </Routes>
            </div>
    )
}

export default App

import './App.css'
import {Sidebar} from "./components/sidebar/sidebar.tsx";
import {Outlet} from 'react-router-dom';

function App() {

    return (
        <div className='root'>
            <div className='sidebar'>
                <Sidebar/>
            </div>
            <Outlet/>
        </div>
    )
}

export default App

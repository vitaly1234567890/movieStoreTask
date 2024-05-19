import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/index.scss'
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from "./services/store.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <MantineProvider>
                <App />
            </MantineProvider>
        </BrowserRouter>
    </Provider>

)

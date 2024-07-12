import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/index.scss'
import '@mantine/core/styles.css';
import {RouterProvider} from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from "./services/store.tsx";
import {router} from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectionRoute from "./ProtectionRoute";
import MyCollectionPage from "../pages/MyCollectionPage";
import Unauthorized from "../pages/Unauthorized";
import CreateCollectionPage from "../pages/CreateCollectionPage";
import EditCollectionPage from "../pages/EditCollectionPage";
import CreateGamePage from "../pages/CreateGamePage";




const guestRouter = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/collection' , element: <ProtectionRoute element={<MyCollectionPage/>} reqRole={'USER'}/>},
    { path: '/collection/create' , element: <ProtectionRoute element={<CreateCollectionPage/>} reqRole={'USER'}/>},
    { path: '/collection/edit' , element: <ProtectionRoute element={<EditCollectionPage/>} reqRole={'USER'}/>},
    { path: '/game/create' , element: <ProtectionRoute element={<CreateGamePage/>} reqRole={'USER'}/>},
    { path : '/unauthorized',element : <Unauthorized/>}

])



export default function AppRouter() {
    return (
        <>
            <RouterProvider router={guestRouter} />
        </>
    )
};
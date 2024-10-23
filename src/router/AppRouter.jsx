import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectionRoute from "./ProtectionRoute";
import MyCollectionPage from "../pages/MyCollectionPage";
import Unauthorized from "../pages/Unauthorized";
import CreateCollectionPage from "../pages/CreateCollectionPage";
import EditCollectionPage from "../pages/EditCollectionPage";
import CreateGamePage from "../pages/CreateGamePage";
import GameRoom from "../pages/GameRoom";
import ManageUser from "../pages/ManageUser";
import ManageCollection from "../pages/ManageCollection";
import Header from "../components/Header"




const guestRouter = createBrowserRouter([{
    path: '/'
    , element: <div>
            <Header />
            <div className='w-screen h-screen fixed bg-main -z-10 min-h-fit'></div>
            <Outlet />
        </div>,
    children :

    [
        { path: '/', element: <HomePage /> },
        { path: '/register', element: <RegisterPage /> },
        { path: '/collection', element: <ProtectionRoute element={<MyCollectionPage />} reqRole={'USER'} /> },
        { path: '/collection/create', element: <ProtectionRoute element={<CreateCollectionPage />} reqRole={'USER'} /> },
        { path: '/collection/edit', element: <ProtectionRoute element={<EditCollectionPage />} reqRole={'USER'} /> },
        { path: '/game/create', element: <ProtectionRoute element={<CreateGamePage />} reqRole={'USER'} /> },
        { path: '/game/room', element: <ProtectionRoute element={<GameRoom />} reqRole={'USER'} /> },
        { path: '/admin/user', element: <ProtectionRoute element={<ManageUser />} reqRole={'ADMIN'} /> },
        { path: '/admin/collection', element: <ProtectionRoute element={<ManageCollection />} reqRole={'ADMIN'} /> },
        { path: '/unauthorized', element: <Unauthorized /> }, 
        
    ]
    }]
)



export default function AppRouter() {
    return (
        <>
            <RouterProvider router={guestRouter} />
        </>
    )
};
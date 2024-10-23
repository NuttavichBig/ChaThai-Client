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
import SummaryPage from "../pages/SummaryPage";
import AdminSideBar from "../components/AdminSideBar";
import NotFound from "../pages/NotFound";
import DisSocketRoute from "./DisSocketRoute";




const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <div>
            <DisSocketRoute />
            <Header />
            <div className='w-screen h-screen fixed bg-main -z-10'></div>
            <Outlet />
        </div>,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/register', element: <RegisterPage /> },
            { path: '/collection', element: <ProtectionRoute element={<MyCollectionPage />} reqRole={'USER'} /> },
            { path: '/collection/create', element: <ProtectionRoute element={<CreateCollectionPage />} reqRole={'USER'} /> },
            { path: '/collection/edit', element: <ProtectionRoute element={<EditCollectionPage />} reqRole={'USER'} /> },
            { path: '/game', element: <ProtectionRoute element={<CreateGamePage />} reqRole={'USER'} /> },


        ]
    }, {
        path: '/game',
        element: <div>
            <Header />
            <div className='w-screen h-screen fixed bg-main -z-10'></div>
            <Outlet />
        </div>,
        children: [
            { path: 'room', element: <ProtectionRoute element={<GameRoom />} reqRole={'USER'} /> },
            { path: 'summary', element: <ProtectionRoute element={<SummaryPage />} reqRole={'USER'} /> },
            { path: '*', element: <ProtectionRoute element={<NotFound />} reqRole={'USER'} /> }
        ]
    },
    {
        path: '/',
        element: <div>
            <DisSocketRoute />
            <div className='w-screen h-screen fixed bg-main -z-10'></div>
            <Outlet />
        </div>,
        children: [
            { path: '/unauthorized', element: <Unauthorized /> },
            { path: '*', element: <NotFound /> },
        ]
    },
    {
        path: '/admin',
        element:
            <div>
                <DisSocketRoute />
                <AdminSideBar />
                <Header />
                <div className='w-screen h-screen fixed bg-main -z-10 min-h-fit'></div>
                <Outlet />
            </div>,
        children: [
            { path: '/admin', element: <ProtectionRoute element={<ManageUser />} reqRole={'ADMIN'} /> },
            { path: 'collection', element: <ProtectionRoute element={<ManageCollection />} reqRole={'ADMIN'} /> },
            { path: '*', element: <ProtectionRoute element={<NotFound />} reqRole={'ADMIN'} /> },
        ]
    },
]
)



export default function AppRouter() {
    return (
        <>
            <RouterProvider router={guestRouter} />
        </>
    )
};
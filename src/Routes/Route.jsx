import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import Home from '../Components/Home';
import AddTask from '../Pages/AddTask';
import BrowseTask from '../Pages/BrowseTask';
import PostedTask from '../Pages/PostedTask';
import Signup from '../Pages/Signup';
import SignIn from '../Pages/SignIn';
import PrivateRoute from './PrivateRoute';
import Error from '../Pages/Error';
import UserDetails from '../Pages/UserDetails';
import TaskDetails from '../Pages/TaskDetails';
import Loading from '../Components/Loading';
import UpdateTask from '../Pages/UpdateTask';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        hydrateFallbackElement: <Loading></Loading>,


        children: [

            { index: true, element: <Home></Home> },

            {
                path: '/addtask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },

            {
                path: '/browseTasks',
                loader: () => fetch('https://snap-tasker-server.vercel.app/task'),
                element: <BrowseTask></BrowseTask>
            },
            {
                path: '/taskDetails/:id',
                loader: ({ params }) => fetch(`https://snap-tasker-server.vercel.app/task/${params.id}`),
                element: <PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>
            },

            {
                path: '/postedTasks',
                loader: () => fetch('https://snap-tasker-server.vercel.app/task'),
                element: <PrivateRoute><PostedTask></PostedTask></PrivateRoute>
            },

            { path: '/signin', element: <SignIn></SignIn> },

            { path: '/signup', element: <Signup></Signup> },

            {
                path: '/userDetails',
                element: <PrivateRoute><UserDetails></UserDetails></PrivateRoute>
            },

            {
                path: '/updatetask/:id',
                loader: ({ params }) => fetch(`https://snap-tasker-server.vercel.app/task/${params.id}`),
                element: <PrivateRoute><UpdateTask></UpdateTask></PrivateRoute>
            },

            {
                path: '/taskbids/:id',
                element: <PrivateRoute><p>this is task bids </p></PrivateRoute>
            },

        ]
    },
]);

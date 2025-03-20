import { createBrowserRouter } from "react-router-dom";
import ArtworkDisplay from "./components/ArtworkDisplay";
import DrawingCanvas from "./components/Sketch";
import Home from "./components/Home";
import PersonalArea from "./components/PersonalArea";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import ColoredFilesList from "./components/ColoredFiles";
import ColoredFiles from "./components/ColoredFiles";

// export const myRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <AppLayout />,
//         errorElement: <>main error</>,
//         children: [

//             {
//                 path: 'login',
//                 element: <Login />
//             },
//             {
//                 path: 'dashboard',
//                 element: <PersonalArea />
//             }
//         ]
//     }, {
//         path: 'categories/:id',
//         element: <ArtworkDisplay />
//     },
//     {
//         path: 'drawing/:id',
//         element: <DrawingCanvas />
//     }
// ]);
export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <PersonalArea />,
            },
            {
                path: 'categories/:id',
                element: <ArtworkDisplay />,
            },
            {
                path: 'drawing/:id',
                element: <DrawingCanvas />,
            }
            ,
            {
                path: 'coloredFiles',
                element: <ColoredFiles />,
            }
        ],
    },
]);

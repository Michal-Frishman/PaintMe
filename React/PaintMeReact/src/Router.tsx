import { createBrowserRouter } from "react-router-dom";
import ArtworkDisplay from "./components/ArtworkDisplay";
import DrawingCanvas from "./components/Sketch";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import ColoredFiles from "./components/ColoredFiles";
import FileUploader from "./components/Upload";
import CategoryList from "./components/CategoryList";

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
            }, {
                path: 'categories',
                element: <CategoryList />,
            },
            // {
            //     path: '',
            //     element: <PersonalArea />,
            // },
            {
                path: 'categories/:id',
                element: <ArtworkDisplay />,
            },
            {
                path: 'drawing/:id',
                element: <DrawingCanvas isColored={false} />,
            }
            , {
                path: 'colored/drawing/:id',
                element: <DrawingCanvas isColored={true} />,
            }
            ,
            {
                path: 'coloredFiles',
                element: <ColoredFiles />,
            },
            {
                path: 'upload',
                element: <FileUploader />,
            }
        ],
    },
]);

// import { createBrowserRouter } from "react-router-dom";
// import ArtworkDisplay from "./components/ArtworkDisplay";
import ModernDrawingCanvas from "./components/Sketch";
// import AppLayout from "./components/AppLayout";
// import Login from "./components/Login";
// import ColoredFiles from "./components/ColoredFiles";
// // import FileUploader from "./components/Upload";
// import CategoryList from "./components/CategoryList";
import UploadForm from "./components/Upload";

// import { Login } from "@mui/icons-material";
import {  createHashRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ArtworkDisplay from "./components/ArtworkDisplay";
import CategoryList from "./components/CategoryList";
import ColoredFiles from "./components/ColoredFiles";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";

// // export const myRouter = createBrowserRouter([
// //     {
// //         path: '/',
// //         element: <AppLayout />,
// //         errorElement: <>main error</>,
// //         children: [

// //             {
// //                 path: 'login',
// //                 element: <Login />
// //             },
// //             {
// //                 path: 'dashboard',
// //                 element: <PersonalArea />
// //             }
// //         ]
// //     }, {
// //         path: 'categories/:id',
// //         element: <ArtworkDisplay />
// //     },
// //     {
// //         path: 'drawing/:id',
// //         element: <DrawingCanvas />
// //     }
// // ]);
// export const myRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <AppLayout />,
//         errorElement: <>main error</>
//     },

//     // children: [
//     {
//         path: '/login',
//         element: <Login />,
//     }, {
//         path: '/categories',
//         element: <CategoryList />,
//     },
//     // {
//     //     path: '',
//     //     element: <PersonalArea />,
//     // },
//     {
//         path: '/categories/:id',
//         element: <ArtworkDisplay />,
//     },
//     {
//         path: '/drawing/:id',
//         element: <ModernDrawingCanvas isColored={false} />,
//     }
//     , {
//         path: '/colored/drawing/:id',
//         element: <ModernDrawingCanvas isColored={true} />,
//     }
//     ,
//     {
//         path: '/coloredFiles',
//         element: <ColoredFiles />,
//     },
//     {
//         path: '/upload',
//         element: <UploadForm />,
//     }
//     // ],
//     // },
// ]);

// export const myRouter = createBrowserRouter([

export const myRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <>main error</>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/categories",
        element: <CategoryList />,
      },
      {
        path: "/categories/:id",
        element: <ArtworkDisplay />,
      },
      {
        path: "/drawing/:id",
        element: <ModernDrawingCanvas isColored={false} />,
      },
      {
        path: "/colored/drawing/:id",
        element: <ModernDrawingCanvas isColored={true} />,
      },
      {
        path: "/coloredFiles",
        element: <ColoredFiles />,
      },
      {
        path: "/upload",
        element: <UploadForm />,
      },
    ],
  },
])

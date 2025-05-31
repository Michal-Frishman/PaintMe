
import ModernDrawingCanvas from "./components/Sketch";
import UploadForm from "./components/Upload";

import {  createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ArtworkDisplay from "./components/ArtworkDisplay";
import CategoryList from "./components/CategoryList";
import ColoredFiles from "./components/ColoredFiles";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";



export const myRouter = createBrowserRouter([
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


import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import ArtworkDisplay from "./components/ArtworkDisplay";
import CategoryList from "./components/CategoryList";
import ColoredFiles from "./components/ColoredFiles";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login";
import FileUploader from "./components/UploadFile/FileUploader";
import DrawingCanvas from "./components/DrawingCanvas/DrawingCanvas";

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
        element: <DrawingCanvas isColored={false} />,
      },
      {
        path: "/colored/drawing/:id",
        element: <DrawingCanvas isColored={true} />,
      },
      {
        path: "/coloredFiles",
        element: <ColoredFiles />,
      },
      {
        path: "/upload",
        element: <FileUploader />,
      },
    ],
  },
])


import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import ArtworkDisplay from "./Components/ArtworkDisplay";
import CategoryList from "./Components/CategoryList";
import ColoredFiles from "./Components/ColoredFiles";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login";
import FileUploader from "./Components/UploadFile/FileUploader";
import DrawingCanvas from "./Components/DrawingCanvas/DrawingCanvas";

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

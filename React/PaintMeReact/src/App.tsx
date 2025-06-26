import { RouterProvider } from "react-router-dom";
import "./App.css";
import { myRouter } from "./Router";
import { ThemeProvider } from "@mui/material";
import theme from "./components/Designs/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="relative flex min-h-screen flex-col bg-gradient-paintme">
        <RouterProvider router={myRouter} />
      </div>
    </ThemeProvider>

  );
}

export default App;

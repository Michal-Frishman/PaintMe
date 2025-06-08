import { Outlet } from "react-router";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
const AppLayout = () => {
    return (
        <>
            <Header />
            <Box sx={{ pt: 15 }}>
                <Outlet />
            </Box>
            <Footer />

        </>
    );
};

export default AppLayout

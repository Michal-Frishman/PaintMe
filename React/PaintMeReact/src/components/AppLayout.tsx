import { Outlet } from "react-router";
import Header from "../pages/Header";
import { Box } from "@mui/material";
const AppLayout = () => {
    return (
        <>
            <Header />
            <Box sx={{ pt: 15 }}> {/* Padding top to create space below the header */}
                <Outlet />
            </Box>
        </>
    );
};

export default AppLayout

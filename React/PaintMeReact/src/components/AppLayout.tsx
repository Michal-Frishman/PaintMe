import { Outlet, useLocation } from "react-router";
import { Toolbar } from "@mui/material";
import Header from "./Header";
import Login from "./Login";
import CategoryList from "./CategoryList";
const AppLayout = () => {
    const location = useLocation();
    const showCategoryList = location.pathname === '/';

    return (
        <>
       <Header />
       {showCategoryList && <CategoryList />}
       <Outlet />
       </>
    );
};
export default AppLayout

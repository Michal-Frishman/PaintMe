import { Outlet, useLocation } from "react-router";
import Header from "./Header";
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

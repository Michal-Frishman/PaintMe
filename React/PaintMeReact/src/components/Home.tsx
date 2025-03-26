import Login from './Login';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            {/* <Header /> */}
            {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} /> */}
            {/* <CategoryList /> */}
            {/* <Watermark /> */}
            <Login /> 
            <Outlet/>
            {/* <CategoryList />  */}
    </div>
    );
};

export default Home;


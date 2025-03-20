import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Watermark from './Watermark';
import Login from './Login';
import CategoryList from './CategoryList';
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


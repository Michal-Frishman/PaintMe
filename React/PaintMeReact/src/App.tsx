import { createContext, Dispatch, useState } from 'react';
import './App.css'
import Categories from './components/Categories';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Watermark from './components/Watermark';
import Login from './components/Login';
import DrawingCanvas from './components/Sketch';
import LoginForm from './components/LoginForm';
export const buttonStyle = {
  color: "white",
  backgroundColor: "rgb(215, 155, 154)",
  margin: 0.5,
  '&:hover': {
    color: "white"
  }
}

function App() {
  const [categories] = useState([
    { id: 1, name: "דמויות", icon: "👧", bgColor: "#dbeafe" },
    { id: 2, name: "חגים", icon: "🎁", bgColor: "#fef9c3" },
    { id: 3, name: "כלי רכב", icon: "🚗", bgColor: "#fee2e2" },
    { id: 4, name: "פנטזיה", icon: "🦄", bgColor: "#f3e8ff" },
    { id: 5, name: "טבע ונוף", icon: "🌲", bgColor: "#dcfce7" },
    { id: 6, name: "חיות", icon: "🐼", bgColor: "#e0f2fe" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("מחפש:", searchTerm);
      alert("מחפש: " + searchTerm);
    }
  };

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <Categories categories={categories} />
      <Watermark />
      <Login/>
      {/* <LoginForm/> */}
      {/* <DrawingCanvas/> */}
    {/* <PaintsList/> */}
    </div>
  );
}

export default App


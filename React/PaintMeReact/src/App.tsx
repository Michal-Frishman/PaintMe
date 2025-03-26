// import {useState } from 'react';
import { Outlet, RouterProvider } from 'react-router';
import './App.css'
import { myRouter } from './Router';
import FileUploader from './components/Upload';
export const buttonStyle = {
  color: "white",
  backgroundColor: "rgb(215, 155, 154)",
  margin: 0.5,
  '&:hover': {
    color: "white"
  }
}

  // const [categories] = useState([
  //   { id: 1, name: "דמויות", icon: "👧", bgColor: "#dbeafe" },
  //   { id: 2, name: "חגים", icon: "🎁", bgColor: "#fef9c3" },
  //   { id: 3, name: "כלי רכב", icon: "🚗", bgColor: "#fee2e2" },
  //   { id: 4, name: "פנטזיה", icon: "🦄", bgColor: "#f3e8ff" },
  //   { id: 5, name: "טבע ונוף", icon: "🌲", bgColor: "#dcfce7" },
  //   { id: 6, name: "חיות", icon: "🐼", bgColor: "#e0f2fe" },
  // ]);

  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (e:any) => {
  //   e.preventDefault();
  //   if (searchTerm.trim()) {
  //     console.log("מחפש:", searchTerm);
  //     alert("מחפש: " + searchTerm);
  //   }
  // };
  function App() {

  return (

    <div className="app">
      <RouterProvider router={myRouter} />
      {/* <ColoredFiles></ColoredFiles> */}
      {/* <FileUploader/> */}
      {/* <ShowImg fileName='aaa.jpg' setColor='black'></ShowImg> */}
    </div>
  );
}

export default App


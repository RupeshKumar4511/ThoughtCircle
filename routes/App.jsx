import Header from "../src/Components/Header.jsx";
import Footer from "../src/Components/Footer.jsx";
import SideBar from "../src/Components/SideBar.jsx";
import { Outlet } from 'react-router-dom';
import { useState } from "react";


function App() {
 const [open,setOpen] = useState(false);

  return (
    <>
        <div className="w-full flex items-start flex-col bg-gray-100 ">
        <Header setOpen={setOpen}/>
        <div className="w-full min-h-screen flex gap-4 relative">
          <SideBar open={open} />
          <Outlet />
        </div>
        <Footer/>
        </div>
    </>

  )
}

export default App;

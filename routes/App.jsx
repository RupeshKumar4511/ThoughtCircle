import Header from "../src/Components/Header.jsx";
import Footer from "../src/Components/Footer.jsx";
import SideBar from "../src/Components/SideBar.jsx";
import { Outlet } from 'react-router-dom';
import { useState } from "react";


function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex items-start flex-col bg-gray-100 ">
        <Header setOpen={setOpen} />
        <div className="w-full min-h-screen flex gap-4 relative">
          <SideBar open={open} setOpen={setOpen} />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>

  )
}

export default App;


export const loadUserData = async () => {
  const customMsg = { message: "Logout Successfully", logout: true };

  try {
    const response = await fetch('https://thoughtcircle.onrender.com/user', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } else {
      localStorage.setItem("user", JSON.stringify(customMsg));
      return customMsg;
    }
  } catch (error) {
    localStorage.setItem("user", JSON.stringify(customMsg));
    return customMsg;
  }
};

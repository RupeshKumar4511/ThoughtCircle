import { useEffect, useState } from 'react';
function Header({setOpen}) {

  const [display, setDisplay] = useState("");
  const [display2, setDisplay2] = useState("hidden");
  useEffect(() => {
    const handleChange = () => {
      setDisplay('d-none');
      setDisplay2('d-inline')
    };

    window.addEventListener("handlechange", handleChange);
    return () => {
      window.removeEventListener("handlechange", handleChange);
    };
  }, []);

  return (

    <header className="flex md:justify-between min-w-full md:px-8 md:py-4 h-auto shadow-md bg-slate-200 items-center px-2 py-1 sticky top-0 z-20">
      <h3 className='text-md md:hidden px-3 cursor-pointer' onClick={()=>setOpen((prevState)=> !prevState)}>&#x2630;</h3>
      <div className='flex md:gap-5 justify-center items-center gap-2'>
        <h2 className='md:text-3xl text-blue-900 font-bold text-xl'>ThoughtCircle</h2>
        <h4 className='pt-1 text-blue-900 text-xs md:text-xl sm:text-md hidden sm:block'> Where thoughts gather and grow</h4>
      </div>

    <form className="hidden lg:block">
        <input type="search" className="border focus:outline-blue-900 focus:border-blue-900 rounded px-4 py-1" placeholder="Search..." />
      </form>

      <div className="md:flex hidden">
        {/* <Link to="/signin" className={display} ><button type="button" className="bg-blue-500 border-blue-600 px-4 py-1 text-md rounded-md cursor-pointer" >Login</button></Link>
        <Link to="/register" className={display} ><button type="button" className="bg-amber-400 border-amber-600 px-4 py-1 text-md rounded-md cursor-pointer">Sign-up</button></Link> */}
        <h4 className={display}>Welcome User</h4>
      </div>


    </header>

  );
}

export default Header;
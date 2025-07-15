import { useSelector } from "react-redux";

function Header({setOpen}) {
  const {authResponse} = useSelector(store=>store.auth);

  return (

    <header className="flex md:justify-between min-w-full
    h-12 md:h-auto md:px-8 md:py-4 shadow-md bg-slate-200 items-center px-2 py-1 sticky top-0 z-20">
      <h3 className='text-md md:hidden px-3 cursor-pointer' onClick={()=>setOpen((prevState)=> !prevState)}>&#x2630;</h3>
      <div className='flex md:gap-5 justify-center items-center gap-2'>
        <h2 className='md:text-3xl text-blue-900 font-bold text-xl'>ThoughtCircle</h2>
        <h4 className='pt-1 text-blue-900 text-xs md:text-xl sm:text-md hidden sm:block'> Where thoughts gather and grow</h4>
      </div>

    <form className="hidden lg:block">
        <input type="search" className="border focus:outline-blue-900 focus:border-blue-900 rounded px-4 py-1" placeholder="Search..." />
      </form>

      <div className="md:flex hidden">
        <h4 >Welcome <span>{authResponse.username}</span></h4>
      </div>


    </header>

  );
}

export default Header;
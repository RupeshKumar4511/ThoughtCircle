import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import LoginModal from './LoginModal.jsx';
import SignUpModal from './SignUpModal.jsx';

const Home = () => {
    const [isOpenSignUp,setOpenSignUp] = useState(false);
    const [isOpenSignIn,setOpenSignIn] = useState(false);
    return (
        <>
            <header className="flex min-w-full md:py-4 h-12 md:h-auto shadow-md bg-gray-200 items-center px-5 py-1 justify-between">
                <div className='flex justify-center items-center gap-4'>
                    <h2 className='md:text-3xl text-blue-900 font-bold text-xl'>ThoughtCircle</h2>
                    <h4 className='pt-1 text-blue-900 text-xs md:text-xl hidden md:block'> Where thoughts gather and grow</h4>
                </div>

                <div className="flex gap-2">
                    <button type="button" className={`bg-blue-500 border-blue-600 md:px-4 md:py-1 px-2 py-0.5 md:text-md text-sm rounded-md cursor-pointer ${isOpenSignIn?'hidden': ''}`}
                     onClick={()=>setOpenSignIn(true)} >Login</button>
                    <button type="button" className={`bg-amber-400 border-amber-600 md:px-4 md:py-1 py-0.5 px-2 md:text-md rounded-md cursor-pointer text-sm ${isOpenSignUp?'hidden': ''}`}
                    onClick={()=>setOpenSignUp(true)}>Sign-up</button>
                </div>
            </header>
            <LoginModal isOpen={isOpenSignIn} setOpen={setOpenSignIn}/>
            <SignUpModal isOpen={isOpenSignUp} setOpen={setOpenSignUp}/>

            <Outlet/>
           

           
        </>
    )
}

export default Home

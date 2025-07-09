import { Link, Outlet } from "react-router-dom"

const Home = () => {
    return (
        <>
            <header className="flex min-w-full md:py-4 h-12 md:h-auto shadow-md bg-gray-200 items-center px-5 py-1 justify-between">
                <div className='flex justify-center items-center gap-4'>
                    <h2 className='md:text-3xl text-blue-900 font-bold text-xl'>ThoughtCircle</h2>
                    <h4 className='pt-1 text-blue-900 text-xs md:text-xl hidden md:block'> Where thoughts gather and grow</h4>
                </div>

                <div className="flex gap-2">
                    <Link to="/signin" className="" ><button type="button" className="bg-blue-500 border-blue-600 md:px-4 md:py-1 px-2 py-0.5 md:text-md text-sm rounded-md cursor-pointer" >Login</button></Link>
                    <Link to="/signup" className="" ><button type="button" className="bg-amber-400 border-amber-600 md:px-4 md:py-1 py-0.5 px-2 md:text-md rounded-md cursor-pointer text-sm">Sign-up</button></Link>
                </div>
            </header>
           

            < Outlet />
        </>
    )
}

export default Home

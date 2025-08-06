import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/authSlice';


export default function SideBar({ open }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false);

    const { authResponse, error } = useSelector((store) => store.auth);
    const handleSignOut = () => {
        dispatch(signOut({ username: authResponse.username }))

    }

    useEffect(() => {
        if (authResponse.logout === true) {
            navigate('/');
        }
    }, [authResponse, navigate])

    if (error.signOutError) {
        alert("Something went wrong.")
    }

    function getUserName(user) {
        const username = user.charAt(0).toUpperCase() + user.slice(1);
        return username;
    }




    if (authResponse.username) {
        return (

            <div className={`max-w-max bg-slate-200 flex-col 
        md:px-6 lg:px-14 px-5 py-4 md:flex fixed top-10 left-0 z-10 md:top-16
        bottom-0 ${open ? 'flex' : 'hidden'}`}>
                <NavLink to="/user/post" className="py-1 lg:text-xl" onClick={()=>setOpen(!open)}>Home</NavLink>
                <NavLink to="/user/create-post" className="py-1 lg:text-xl" onClick={()=>setOpen(!open)}>Post</NavLink>
                <Link to="/user/post" className="py-1 flex lg:text-xl" onClick={() => setMenu((prevState) => !prevState)}>{getUserName(authResponse.username)}<IoIosArrowDropdownCircle className='relative top-2' size={15} /></Link>
                <ul className={`px-2 ${menu ? '' : 'hidden'} md:text-md text-sm`}>
                    <li><NavLink to="/user/user-profile" onClick={()=>setOpen(!open)}>Profile</NavLink></li>
                    <li><NavLink to="/user/user-post" onClick={()=>setOpen(!open)}>Your Posts</NavLink></li>
                    <li className='cursor-pointer' onClick={() => {
                        handleSignOut()
                    }}>Sign out</li>
                </ul>
            </div>

        );
    }

}
import { Link, NavLink } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState } from 'react';

export default function SideBar({open}) {

    const [menu,setMenu]= useState(false);

    return (
    
        <div className={`md:w-56  bg-slate-200 flex-col
         md:px-14 px-5 py-4 md:flex absolute top-0 left-0 md:relative z-10
        bottom-0 ${open?'flex':'hidden'}`}>
            <NavLink to="/user/post" className="py-1 lg:text-xl">Home</NavLink>
            <NavLink to="/user1/create-post" className="py-1 lg:text-xl">Post</NavLink>
            <Link to="/user2" className="py-1 flex lg:text-xl" onClick={()=>setMenu((prevState)=>!prevState)}>username <IoIosArrowDropdownCircle className='relative top-2' size={15} /></Link>
            <ul className={`px-2 ${menu?'':'hidden'} md:text-md text-sm`}>
                <li><NavLink to="/user-profile">Profile</NavLink></li>
                <li><NavLink to="/user3/user-post">Your Posts</NavLink></li>
                <li className='cursor-pointer'>Sign out</li>
            </ul>
        </div>
        
    );
}
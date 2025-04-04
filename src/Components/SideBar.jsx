import { useState } from 'react';
import css from './SideBar.module.css';
import { Link } from 'react-router-dom';
export default function SideBar() {

    const [homeactive, setHomeActive] = useState("active");
    const [creatpostactive, setCreatepostActive] = useState("");
    const [yourpostactive, setYourpostActive] = useState("");

    const handleClick = (tab) => {
        if (tab === "home") {
            setHomeActive('active');
            setCreatepostActive('');
            setYourpostActive('');
        } else if (tab === "your-post") {
            setHomeActive('');
            setCreatepostActive('');
            setYourpostActive('active');
        } 
        else if (tab === "createpost"){

            setHomeActive('');
            setCreatepostActive('active');
            setYourpostActive('');

        }
    }


    return (

        <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${css.sidebar}`} >
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auhref text-white text-decoration-none">

                <svg className="bi me-2" width="40" height="32">
                    <use xlinkHref="#bootstrap"></use></svg>
                <span className="fs-4 ">SocialSync</span>

            </Link>
            <hr />

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item" onClick={() => { handleClick("home") }}>
                    <Link to="/" className={`nav-link  text-white ${homeactive}`} aria-current="page" >
                        <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                        Home
                    </Link>
                </li>
                <li className='nav-item' onClick={() => { handleClick("createpost") }}>
                    <Link to="/create-post" className={`nav-link  text-white ${creatpostactive}`} >
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Create Post
                    </Link>
                </li>

                <li className='nav-item' onClick={() => { handleClick("your-post") }}>
                    <Link to="/your-post" className={`nav-link  text-white ${yourpostactive}`} >
                        <svg className="bi me-2" width="16" height="16"></svg>
                        Your Posts
                    </Link>
                </li>

            </ul>

            {/* <div className="dropdown">
                <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><Link className="dropdown-item" to="#">Profile</Link></li>
                    <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                </ul>
            </div> */}
        </div>

    );
}
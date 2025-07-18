import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="flex flex-col justify-center items-center flex-wrap py-3 bg-gray-200 w-full z-20">
        <ul className="flex justify-evenly py-3 w-full ">
                <li><h1 className="text-xl md:text-3xl text-blue-900 font-bold">ThoughtCircle</h1></li>
                <li><Link to="/home" >Home</Link></li>
                <li><Link to="/" >Features</Link></li>
                <li><Link to="/" >Terms</Link></li>
                <li><Link to="/" >Privacy</Link></li>
            </ul>
            <p className="py-3 text-wrap">&copy; {new Date().getFullYear()}  Rupesh Kumar. All rights reserved.</p>
        </footer>
    )
}

import { Link } from "react-router-dom";

const LoginModalFooter = ({setOpen}) => {
  return (
     <div className="flex justify-end gap-5 px-2">
      <Link to="/reset" className="cursor-pointer text-sm relative md:top-2  top-1 text-blue-800" onClick={()=>{setOpen(false)}}>Reset Password</Link>
          <button className="rounded-md bg-gray-300 px-2 md:px-4 py-1 font-semibold hover:bg-gray-400/80 active:bg-gray-400/60" onClick={()=>{setOpen(false);}}>
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-blue-300 px-2 md:px-4 py-1 font-semibold hover:bg-blue-400/80 active:bg-blue-400/60"  >
            Sign In
          </button>
          
        </div>
  )
}


// onClick={()=>setOpen(false)}

export default LoginModalFooter

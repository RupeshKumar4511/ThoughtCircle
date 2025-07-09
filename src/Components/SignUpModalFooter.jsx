import { useNavigate } from 'react-router-dom';

const SignUpModalFooter = ({setOpen}) => {
  const navigate = useNavigate()
  return (
     <div className="flex justify-end gap-4">
          <button className="rounded-md bg-gray-300 px-6 py-2 font-semibold hover:bg-gray-400/80 active:bg-gray-400/60" onClick={()=>{setOpen(false);
            navigate('/')}}>
            Cancel
          </button>
          <button className="rounded-md bg-blue-300 px-6 py-2 font-semibold hover:bg-blue-400/80 active:bg-blue-400/60" >
            Sign Up
          </button>
        </div>
  )
}

export default SignUpModalFooter

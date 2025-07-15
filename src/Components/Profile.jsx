import { useSelector } from "react-redux"

const Profile = () => {

  const {response} = useSelector(store=>store.auth);
  return (
    <div className="flex justify-center w-full my-5 ">
      <div className="flex flex-col gap-5 bg-white w-[80%] md:w-[70%] lg:w-[50%] h-70 py-5  shadow-md">
        <p className="flex text-xl md:text-2xl font-bold text-blue-800 justify-center">Your Profile</p>
        <div className="flex flex-col mx-auto gap-4 px-5">
            <p className="md:text-xl font-medium">UserName : <span className="text-blue-500">{response?.username}</span></p>
            <p className="md:text-xl font-medium">Email Id : <span className="text-blue-500">{response?.email}</span></p>
            {/* <p className="md:text-xl font-medium">Role : <span className="text-blue-500">{response.role}</span></p> */}
            
        </div>
      </div>
    </div>
  )
}

export default Profile

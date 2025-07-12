import { useRef } from 'react';
import { useForm } from "react-hook-form";
import LoginModalHeader from "./LoginModalHeader";
import LoginModalFooter from "./LoginModalFooter";
import { signIn } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage'

export default function Login({isOpen,setOpen}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const {authResponse,error} = useSelector(store=>store.auth);

  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    dispatch(signIn(data))
  }

  
  if(authResponse.success ===true){
      navigate("/user");
      setOpen(false);

  }

  if(authResponse.success  === false){
    (
      <h1>{authResponse.message}</h1>
    )
  }

  if(error){
    return (
      <ErrorPage/>
    )
  }

  return (
    <>
      <LoginModalHeader />
      <form method="POST" className="vh-100"  ref={formRef}  onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 border-y border-gray-300 px-6 py-6 flex flex-col gap-5 bg-white ">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              placeholder="Enter your username"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text" {...register('username', {
                required: "username is required",
                minLength: { value: 5, message: "username must be 5 characters long." }
              })}
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 left-1">{errors.username?.message}</span>
          </div>

          <div className="flex flex-col gap-2 relative my-3">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="password" {
              ...register('password', {
                required: "password is required",
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contains uppercase and lowercase letter , digit and special character." },
                minLength: { value: 8, message: "Password must be 8 characters long." }
              })
              }
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 left-1">{errors.password?.message}</span>

            
          </div>
        </div>
        <LoginModalFooter isOpen={isOpen} setOpen={setOpen} />
      </form>
    </>
  )
}


// export async function LoginAction(data) {

//   const FormData = await data.request.formData();
//   // console.log(FormData);
//   const loginData = Object.fromEntries(FormData);


//   try {

//     const response = await fetch('http://localhost:5000/signin', {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(loginData)
//     })

//     if (response.ok) {
//       window.dispatchEvent(new Event("clearLoginForm"));
//       window.dispatchEvent(new Event("handlechange"));

//       alert("SignIn Successfully..");
//       return redirect('/')

//     } else {
//       return alert("login Failed")
//     }


//   } catch (error) {
//     return alert("Enter the valid username and password", error)
//   }

// }
import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import LoginModalHeader from "./LoginModalHeader";
import LoginModalFooter from "./LoginModalFooter";
import { signIn } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function Login({ setOpen }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { authResponse,tempAuthResponse, isLoading, error } = useSelector(store => store.auth);


  const { handleSubmit, register, formState: { errors } } = useForm();


  const onSubmit = (data) => {
    dispatch(signIn(data))
  }
 
  useEffect(()=>{
      if (authResponse.success === true) {
      navigate("/user");
    }
    },[authResponse,navigate])

  if(isLoading){
    return(<LoadingSpinner/>)
  }



  return (
    <>
      <LoginModalHeader />
      <form method="POST" className="vh-100" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 border-y border-gray-300 px-6 py-6 flex flex-col gap-5 bg-white ">
          <p className={`text-red-500 ${tempAuthResponse.success?'hidden':''}`}>{!tempAuthResponse.success?tempAuthResponse.message:''}</p>
          <p className={`text-red-500 ${error.authError?'':'hidden'}`}>{error.authError?error.authError:''}</p>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="login-username"
              placeholder="Enter your username"
              autoComplete='true'
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
              id="login-password"
              placeholder="Enter your password"
              autoComplete='true'
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
        <LoginModalFooter setOpen={setOpen} />
      </form>
    </>
  )
}


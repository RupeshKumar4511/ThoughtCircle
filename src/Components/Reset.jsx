import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { sendMail } from '../store/authSlice';

const Reset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { sendEmailResponse, error } = useSelector(store => store.auth);

  const { handleSubmit, register, getValues, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    dispatch(sendMail(data))
  }

  useEffect(() => {

    if (sendEmailResponse.success === true) {
      navigate("/verify-user", {
        state: getValues()
      });
    }


  }, [sendEmailResponse])
  if (sendEmailResponse.success === false) {
    return (
      <h1>{sendEmailResponse.message}</h1>
    )
  }

  if (error.sendEmailError) {
    return (
      <ErrorPage />
    )
  }
  return (

    <form className="vh-100 w-80 mx-auto border my-5 px-5 py-5 border-black/40 rounded-md shadow-md" ref={formRef} method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xl font-bold text-blue-800">Reset Password</p>
      <div className="my-4 border-y border-gray-300 px-6 py-6 flex flex-col gap-5 bg-white ">

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            {
            ...register('email', {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address"
              },
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters long"
              }
            })
            }
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 left-1">{errors.email?.message}</span>

        </div>

      </div>
      <div className="flex justify-end gap-4">
        <button className="rounded-md bg-gray-300 px-6 py-2 font-semibold hover:bg-gray-400/80 active:bg-gray-400/60" onClick={() => { navigate('/') }}>
          Cancel
        </button>
        <button className="rounded-md bg-blue-300 px-6 py-2 font-semibold hover:bg-blue-400/80 active:bg-blue-400/60" >
          Next
        </button>
      </div>
    </form>
  )
}

export default Reset

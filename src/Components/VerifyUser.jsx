import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function VerifyUser() {
  const { state } = useLocation();
  const formRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { verifyEmailResponse, error } = useSelector(store => store.auth);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()
  const { otp } = getValues();
  const onSubmit = (data) => {
    dispatch(verifyEmail({...data,...state}))
  }


  useEffect(() => {
    if (verifyEmailResponse.success === true) {
      navigate("/reset-password", {
        state: { ...state, otp }
      });
    }

  }, [verifyEmailResponse,navigate])

  if (verifyEmailResponse.success === false) {
    return (
      <h1>{response.message}</h1>
    )
  }

  if (error.verifyEmailError) {
    return (
      <ErrorPage />
    )
  }


  return (
    <form
      method="POST"
      className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-120 lg:max-w-150 mx-auto border-white rounded-md my-5 shadow-md"
      ref={formRef}

      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4 flex flex-col justify-between relative">
        <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
          Enter the OTP sent to your email :
        </label>
        <input
          type="text"
          id="otp"
          placeholder="Enter the OTP"
          name="otp"
          {...register("otp", {
            required: "otp is required",
            maxLength: {
              value: 6, message: "Length of otp cannot exceeds 6 characters."
            }
          })}
          className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full "
        />
        <span className="text-red-500 md:text-sm text-[12px] absolute top-16  right-0">{errors.otp?.message}</span>
      </div>


      <button
        type="submit"
        className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors"
      >
        Verify Email
      </button>
    </form>

  )
}


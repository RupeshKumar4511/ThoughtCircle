import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
export default function VerifyUser() {
  const { state } = useLocation();
  const formRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { verifyEmailResponse, isLoading, error } = useSelector(store => store.auth);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()
  const { otp } = getValues();
  const onSubmit = (data) => {
    dispatch(verifyEmail({ ...data, ...state }))
  }

  if (isLoading) {
    return (<LoadingSpinner />)
  }

  useEffect(() => {
    if (verifyEmailResponse.success === true) {
      navigate("/reset-password", {
        state: { ...state, otp }
      });
    }

  }, [verifyEmailResponse, navigate])


  const [time, setTime] = useState(Math.floor(Date.now() / 1000));
  const [currentTime, setCurrentTime] = useState();



  useEffect(() => {
    const timerID = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      setCurrentTime(now);
      if (now - time >= 300) {
        clearInterval(timerID)
      }
    }, 300)
    return () => {
      clearInterval(timerID)
    }
  }, [time])

  function getTime() {
    let minute = Math.floor((300 - (currentTime - time)) / 60);
    let seconds = Math.floor((300 - (currentTime - time)) % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minute + ":" + seconds;
  }


  return (
    <form
      method="POST"
      className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-120 lg:max-w-150 mx-auto border-white rounded-md my-5 shadow-md"
      ref={formRef}

      onSubmit={handleSubmit(onSubmit)}
    >
      <p className={`text-red-500 ${verifyEmailResponse.success ? 'hidden' : ''}`}>{!verifyEmailResponse.success ? verifyEmailResponse.message : ''}</p>
      <p className={`text-red-500 ${error.verifyEmailError ? '' : 'hidden'}`}>{error.verifyEmailError ? error.verifyEmailError : ''}</p>
      <div className="mb-4 flex flex-col justify-between relative">
        <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
          Enter the OTP sent to your email :
        </label>
        <input
          type="text"
          id="verification-otp"
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
        <p className='text-fuchsia-600 md:text-sm text-[12px] py-1'>OTP will be expired in {getTime()} minute.</p>
        <span className="text-red-500 md:text-sm text-[12px] absolute top-16  right-0">{errors.otp?.message}</span>
      </div>


      <button
        type="submit"
        className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors
        cursor-pointer"
      >
        Verify Email
      </button>
    </form>

  )
}


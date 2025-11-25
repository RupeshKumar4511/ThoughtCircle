import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SignUpModalHeader from './SignUpModalHeader'
import SignUpModalFooter from './SignUpModalFooter'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, sendMail } from '../store/authSlice';
import LoadingSpinner from './LoadingSpinner'

export default function SignUp({ setOpen }) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { sendEmailResponse, isLoading, error } = useSelector(store => store.auth);
  const { handleSubmit, register,getValues, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    const { email, username } = data;
    dispatch(sendMail({ email, username }))

  }

  useEffect(() => {

    if (sendEmailResponse.success === true) {
      setOpen(false);
      dispatch(authActions.updateSendMailResponse());
      setTimeout(() => {
        navigate('/create-user', {
          state: getValues()
        });
      }, 0)
    }


  }, [sendEmailResponse])

  return (
    <>
      <SignUpModalHeader />
      <form className="vh-100 " ref={formRef} method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 border-y border-gray-300 px-6 py-6 flex flex-col gap-5 bg-white ">
          <p className={`text-red-500 ${sendEmailResponse.success?'hidden':''}`}>{!sendEmailResponse.success?sendEmailResponse.message:''}</p>
          <p className={`text-red-500 ${error.sendMailError?'':'hidden'}`}>{error.sendMailError?error.sendMailError:''}</p>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              placeholder="Enter your username"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              {...register('username', {
                required: "username is required",
                minLength: { value: 5, message: "username must be atlest 5 characters long." }
              })}
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 left-1">{errors.username?.message}</span>
          </div>

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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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


          <div className="flex flex-col gap-2 relative mb-3">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 ">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter password"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="password"
              {
              ...register('password', {
                required: "password is required",
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contains uppercase and lowercase letter, digit and special character." },
                minLength: { value: 8, message: "Password must be atleast 8 characters long." }
              })
              }
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 left-1 overflow-y-auto">{errors.password?.message}</span>

          </div>
        </div>
        <SignUpModalFooter setOpen={setOpen} />
        {isLoading&& <LoadingSpinner/>}
      </form>
    </>
  )
}


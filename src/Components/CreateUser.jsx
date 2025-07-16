import {  useRef } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { signUp } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';
import SuccessModal from './SuccessModal';
export default function CreateUser() {
    const dispatch = useDispatch()
    const { state } = useLocation();
    const navigate = useNavigate()
    const formRef = useRef(null);
    const { response, error } = useSelector(store => store.auth);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        const { otp } = data;
        dispatch(signUp({ otp, ...state }))
    }

    const handleClick = (setOpen) => {
        setOpen(false);
        navigate('/')
    }

    if (response.success === true) {
            return (<SuccessModal handleClick={handleClick} message={"SignUp successfully. Login to continue."} />
            )

        }

    if (response.success === false) {
           return (
                <h1>{response.message}</h1>
            )
        }

        if (error.signUpError) {
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


export async function createUserAction(data) {


    const FormData = await data.request.formData();
    const postcreateUserData = Object.fromEntries(FormData);


    try {

        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postcreateUserData)
        })

        if (response.ok) {
            alert("SignUp Successfully..");
            window.dispatchEvent(new Event("clearSignupForm"));
            return redirect('/signin')

        }
        // const result = await response.json()
        // console.log(result);

    } catch (error) {
        return alert("Enter the valid username and password", error)
    }



}
import { useRef } from "react";
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from "../store/apiSlice";
import LoadingSpinner from './LoadingSpinner'
import SuccessModal from "./SuccessModal";
import ErrorPage from "./ErrorPage";
export default function CreatePost() {

    const [addPost, { isLoading, isSuccess, isError }] = useCreatePostMutation();

    const { handleSubmit, register, formState: { errors } } = useForm();
    const formRef = useRef(null);
    const onSubmit = (data) => {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("body", data.body);
        formData.append("tags", data.tags);
        formData.append("image", file);
       
        addPost(formData);

    }

    const handleClick = (setOpen) => {
        setOpen(false);
    }

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    if (isSuccess) {
        return (
            <SuccessModal handleClick={handleClick} message={"Your post is created successfully.."} />
        )
    }

    if (isError) {
        <ErrorPage />
    }


    // We include {encType="multipart/form-data"} in the form becuase
    // form contains input to upload the file.

    return (

        <div className="w-full flex">
            <form
                className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-130 lg:max-w-150  mx-auto border-white rounded-md my-10 shadow-md"
                ref={formRef}
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="flex justify-center items-center md:text-2xl text-xl mb-5 font-bold text-blue-900">Create Your Post</h1>

                <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
                    <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
                        Post Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="How are you feeling today..."
                        name="title"
                        {...register("title", {
                            required: "Title is required",
                            minLength:{value:2,message:"Title must atleast 2 characters long"},
                            maxLength: {
                                value: 50, message: "Length of title cannot exceeds 50 characters."
                            }
                        })}
                        className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto"
                    />
                    <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.title?.message}</span>
                </div>

                <div className="mb-8 flex flex-col relative">
                    <label htmlFor="body" className="text-sm md:text-lg mb-1">
                        Post Content:
                    </label>
                    <textarea
                        id="body"
                        rows={8}
                        placeholder="Tell us more about it"
                        name="body"
                        {...register("body", {
                            required: "Post Content is required",
                            pattern: { value: /\s/, message: "Invalid content" },
                            minLength:{value:10,message:"Content must atleast 10 characters long"},
                            maxLength:{value:1000,message:"Content must not exceeds 1000 characters"}
                        })}
                        className="shadow-xs border border-black/10 focus:outline-blue-400 rounded-md px-2 py-2 w-full"
                    />
                    <span className="text-red-500 md:text-sm text-[12px] absolute top-62 right-0 ">{errors.body?.message}</span>
                </div>

                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between relative">
                    <label htmlFor="tags" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
                        Post Tags:
                    </label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="Enter your hashtags by adding space"
                        name="tags"
                        {...register("tags", {
                            required: "Tags are required",
                            pattern: { value: /\s/, message: "Invalid tags" },
                            minLength:{value:2,message:"Tags must atleast 2 characters long"},
                            maxLength:{value:100,message:"Tags must not exceeds 100 characters"}
                        })}
                        className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto"
                    />
                    <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.tags?.message}</span>
                </div>

                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between relative">
                    <label htmlFor="image" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
                        Post Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto"
                        {...register("image", {
                            required: "Image is required",
                        })}
                    />
                    <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.image?.message}</span>
                </div>

                <button
                    type="submit"
                    className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Post
                </button>
            </form>
        </div>
    );
}


// export async function postDataAction(data) {

//     // const form = await data.request.formData();
//     // const formData = new FormData();
//     // // const postData = Object.fromEntries(FormData);
//     // formData.append("title", form.get("title"));
//     // formData.append("body", form.get("body"));
//     // formData.append("tags", form.get("tags"));
//     // formData.append("image", form.get("image"));

//     // console.log(formData);
//     const form = await data.request.formData();

//     // Log the entries for debugging
//     for (const [key, value] of form.entries()) {
//         console.log(`${key}:`, value);
//     }


//     try {

//         const response = await fetch('http://localhost:5000/create-post', {
//             method: 'POST',
//             credentials: 'include',
//             //  headers: { 'Content-Type': 'application/json' },
//             body: form
//         })

//         if (response.ok) {
//             window.dispatchEvent(new Event("clearPostForm"));
//             alert("Your Post Submitted Successfully..");


//         }
//         else {
//             return alert("Please Login First")
//         }


//     } catch (error) {
//         return alert("Internal Server Error")
//     }


// }
import UserPost from "./UserPost.jsx";
import Message from "./Message.jsx";
import { useGetUserPostsQuery } from "../store/apiSlice.js";
import ErrorPage from "./ErrorPage.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";



export default function UserPostList() {
    const { data: postList, isLoading, error } = useGetUserPostsQuery();
    
    if (isLoading) {
        return <LoadingSpinner />
    }
    if (!isLoading && error) {
        return <ErrorPage />
    }
   


    return (
        <>


            
             {!isLoading && postList.length === 0 && <Message />}
            <div className="flex flex-col md:w-120 w-85 h-full justify-center items-center mx-auto overflow-hidden">
                <h1 className="flex justify-center mx-auto w-full my-4 md:text-2xl text-xl text-blue-500 font-bold">Your Posts </h1>
                {postList.map((post) =>
                    <UserPost key={post._id} post={post} />
                )
                }
            </div>


        </>

    )
}

export const loadUserData = async () => {

    const res = await fetch('http://localhost:5000/yourposts', { credentials: 'include' });
    const data = await res.json();
    return Array.from(data);
}
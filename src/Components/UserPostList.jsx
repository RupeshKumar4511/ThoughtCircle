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
             
            <div className="flex flex-col md:w-120 w-85 h-full justify-center items-center mx-auto overflow-hidden">
                <h1 className="flex justify-center mx-auto w-full my-4 md:text-2xl text-xl text-blue-500 font-bold">Your Posts </h1>
                {!isLoading && postList.length === 0 && <Message user={true}/>}
                {postList.map((post) =>
                    <UserPost key={post._id} post={post} />)
                }
            </div>
        </>
    )
}

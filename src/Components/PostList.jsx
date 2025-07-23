import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner"
import Message from "./Message";
import { useGetPostsQuery } from "../store/apiSlice";
import ErrorPage from "./ErrorPage";
import { useLocation } from "react-router-dom";

export default function PostList() {
    
    const {state}= useLocation();
    const {data:postList , isLoading,error}= useGetPostsQuery();
    
    if(isLoading){
        return <LoadingSpinner/>
    }
    if(!isLoading && error){
        return <ErrorPage/>
    }

    return (
        <>
            {!isLoading && postList.length === 0 && <Message />}
            <div className="flex flex-col md:w-120 w-85 h-full justify-center items-center mx-auto overflow-hidden" 
             >
            { postList.filter(post=>post.username.includes(state)).map((post) =>
                <Post key={post._id} post={post} ></Post>)
            }   
            </div> 
        </>
    )
}


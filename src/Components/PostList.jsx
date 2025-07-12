import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner"
import Message from "./Message";
import { useGetPostsQuery } from "../store/apiSlice";
import ErrorPage from "./ErrorPage";


export default function PostList() {
    
    
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
            { postList.map((post) =>
                <Post key={post.id} post={post} ></Post>
            )
            }   
            </div>
            
        </>

    )
}


export const loadData = () =>{
    return fetch('http://localhost:5000/posts',{credentials:'include'})
    .then(res => res.json())
    .then(data => {
        return Array.from(data);    
    }
    );
}


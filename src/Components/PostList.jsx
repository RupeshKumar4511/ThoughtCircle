import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner"
import Message from "./Message";
import { PostListContext } from "../store/Post-List-store";
import { useGetPostsQuery } from "../store/api";

export default function PostList() {

    const {data:postList ,isLoading,isError} = useGetPostsQuery();
    


    return (
        <>
            

            {/* { postList.length === 0 && <Message />} */}
            <div className="flex flex-col md:w-120 w-80 h-full justify-center items-center mx-auto overflow-hidden">
            { !isLoading&&postList.map((post) =>
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


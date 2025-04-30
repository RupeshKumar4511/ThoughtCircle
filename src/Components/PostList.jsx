import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner"
import Message from "./Message";
import { PostListContext } from "../store/Post-List-store";
import { useLoaderData } from "react-router-dom";

export default function PostList() {

    const postList = useLoaderData();

    return (
        <>
            

            { postList.length === 0 && <Message />}
            <div style={{}}>
            { postList.map((post) =>
                <Post key={post._id} post={post} ></Post>
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


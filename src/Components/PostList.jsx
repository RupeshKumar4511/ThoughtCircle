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
                <Post key={post.id} post={post} ></Post>
            )
            }
            </div>
        </>

    )
}


export const loadData = () =>{
    // http://localhost:5000/posts
    return fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(data => {
        return data.posts;    
    }
    );
}


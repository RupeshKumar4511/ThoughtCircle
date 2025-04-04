import { useLoaderData } from "react-router-dom";
import UserPost from "./UserPost.jsx";



export default function UserPostList() {

    const postList = useLoaderData();
    return (
        <>
            

            { postList.length === 0 && <Message />}
            { postList.map((post) =>
                <UserPost key={post.id} post={post} ></UserPost>
            )
            }
        </>

    )
}

export const loadUserData = async () =>{
    // http://localhost:5000/yourposts
    const res = await fetch('https://dummyjson.com/posts');
    const data = await res.json();
    return data.posts;
}
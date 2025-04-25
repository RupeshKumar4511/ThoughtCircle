import { useLoaderData } from "react-router-dom";
import UserPost from "./UserPost.jsx";
import Message from "./Message.jsx";



export default function UserPostList() {

    const postList = useLoaderData();
    return (
        <>
            

            { postList.length === 0 && <Message />}
            { postList.map((post) =>
                <UserPost key={post._id} post={post} ></UserPost>
            )
            }
        </>

    )
}

export const loadUserData = async () =>{
    
    const res = await fetch('http://localhost:5000/yourposts',{credentials:'include'});
    const data = await res.json();
    return Array.from(data);
}
import { useLoaderData } from "react-router-dom";
import UserPost from "./UserPost.jsx";
import Message from "./Message.jsx";
import {postList} from './data.js'



export default function UserPostList() {

    return (
               <>
                   

                   { postList.length === 0 && <Message />}
                   <div className="flex flex-col justify-center mx-auto">
                    <h1 className="flex justify-center mx-auto w-full my-4 md:text-2xl text-xl text-blue-500 font-bold">Your Posts </h1>
                   <div className="flex flex-col md:w-120 w-80 h-full justify-center items-center mx-auto overflow-hidden">
                   { postList.map((post) =>
                       <UserPost key={post.id} post={post} />
                   )
                   }
                   </div>
                   </div>
                   
               </>

    )
}

export const loadUserData = async () =>{
    
    const res = await fetch('http://localhost:5000/yourposts',{credentials:'include'});
    const data = await res.json();
    return Array.from(data);
}
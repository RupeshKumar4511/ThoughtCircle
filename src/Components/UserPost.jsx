import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import { useDeleteUserPostMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const UserPost = ({ post }) => {
    const navigate = useNavigate()
    

    const [deletePost] = useDeleteUserPostMutation();
    return (
        <div className='border-white rounded px-2 py-2 my-3 bg-white shadow-md w-full h-auto' >
                    <img  className="w-full h-[40%]" alt='post-image' src="https://www.w3schools.com/css/img_5terre_wide.jpg" />
                    <div className="py-2 h-[60%]">
                        <h5 className=""><b>Title :</b> {post.title}</h5>
                        <p className=""><b>Content : </b>{post.body}</p>
        
                        {post.tags.map((tag,index) => <span className="bg-blue-500 text-white text-[10px] rounded-2xl px-2 py-1 mx-1 " key={index}>{tag}</span>)
                        }
                        <div className="flex gap-4 px-1 mt-3 ">
                            <button className="flex justify-center items-center px-2 gap-1"><AiOutlineLike /> <span className="text-pink-500">{post.like}</span></button>
                            <button className="flex justify-center items-center px-2 gap-1"><AiOutlineDislike className="relative top-0.5"/><span className="text-yellow-500">{post.dislike}</span></button>
                        </div>

                        <div className="flex gap-4 px-1 mt-4">
                            <button className="bg-green-500 border-green-500 px-4 py-1 rounded-md cursor-pointer hover:bg-green-600 text-white" onClick={()=>{
                            navigate('/user/update-post',{
                                state:post
                            })
                            }}>Update</button>
                            <button className="bg-red-500 border-red-500 px-4 py-1 rounded-md cursor-pointer hover:bg-red-600 text-white"
                            onClick={()=>deletePost(post.id)}>Delete</button>
                        </div>
                    </div>
                </div>
    )
}

export default UserPost;
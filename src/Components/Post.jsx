import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { usePostReactionMutation } from "../store/apiSlice";
import { useSelector } from "react-redux";

const Post = ({ post }) => {

    const {authResponse} = useSelector((store)=>store.auth);
    const [postReaction] = usePostReactionMutation()

    return (
        <div className='border-white rounded px-2 py-2 my-3 bg-white shadow-md w-full' >
            <div className="flex gap-4 pb-2">
                <img className="w-8 h-8 rounded-full" src={post.image} alt="" />
                <p className="text-blue-900">posted by {authResponse.username}</p>
            </div>
            <img className="w-full h-[40%]" alt='post-image' src={post.image} />
            <div className="py-2">
                <h5 className=""><b>Title :</b> {post.title}</h5>
                <p className=""><b>Content : </b>{post.body}</p>

                {post.tags.map((tag, index) => <span className="bg-blue-500 text-white text-[10px] rounded-2xl px-2 py-1 mx-1 " key={index}>{tag}</span>)
                }
                <div className="flex gap-4 px-1 mt-2">
                    <button className="flex justify-center items-center px-2 gap-1 cursor-pointer" onClick={() => postReaction({ id: post._id, reactions: { like: true, dislike: false } })}><AiOutlineLike /> <span className="text-pink-500">{post.reactions.like}</span></button>
                    <button className="flex justify-center items-center px-2 gap-1 cursor-pointer" onClick={() => postReaction({ id: post._id, reactions: { dislike: true, like: false } })} ><AiOutlineDislike className="relative top-0.5" /><span className="text-yellow-500" >{post.reactions.dislike}</span></button>
                </div>
            </div>
        </div>
    )
}

export default Post;
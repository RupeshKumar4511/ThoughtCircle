import styles from "./Post.module.css";
import {useContext} from 'react';
import { MdDelete } from "react-icons/md";
import { PostListContext } from "../store/Post-List-store";
const UserPost = ({ post}) => {

    const {deletePost} = useContext(PostListContext);
    return (
        <div className={`card ${styles.postcard} mt-4 mb-3`} style={{ 'width': '30rem' }}>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=> deletePost(post.id)}>
                
                <MdDelete />

            </span>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>

                {post.tags.map((tag,index) => <span className="badge rounded-pill text-bg-primary me-2" key={index}>{tag}</span>)
                }

            </div>
        </div>
    )
}

export default UserPost;
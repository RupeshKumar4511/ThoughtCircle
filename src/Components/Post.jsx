import styles from "./Post.module.css";
const Post = ({ post}) => {

    return (
        <div className={`card ${styles.postcard} mt-4 mb-3`} style={{ 'width': '30rem' }}>
            <img src={`${post.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>

                {post.tags.map((tag,index) => <span className="badge rounded-pill text-bg-primary me-2" key={index}>{tag}</span>)
                }

            </div>
        </div>
    )
}

export default Post;
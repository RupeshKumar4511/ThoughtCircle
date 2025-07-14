import { createContext, useReducer } from "react";


export const PostListContext = createContext({
    PostList:[],
    addPost: () => {},
    deletePost: () => {}
})


const postListReducer = (currentPostList, action) => {
    let newPostList = currentPostList;
    if(action.type === "DELETE_POST"){
        newPostList = currentPostList.filter((post)=>  post.id !== action.payload.id);

    }
    else if(action.type === "NEW_POST"){
        newPostList = [action.payload,... currentPostList]
        console.log(newPostList);
    }
    
    return newPostList;
}

const PostListProvider = ({ children }) => {


    const [PostList, dispatchList] = useReducer(postListReducer, []);

    // const [fetching, setFetching] = useState(false);

    // useEffect(() => {
    //     setFetching(true);
        
    //     const controller = new AbortController();
    //     const signal = controller.signal; // signal is a member of controller

    //     fetch('https://dummyjson.com/posts', { signal })
    //         .then(res => res.json())
    //         .then(data => {
    //             addInitialPosts(data.posts);
    //             setFetching(false);
    //         }
    //         );


    //     // cleanup function
    //     return () => {
    //         controller.abort();
    //     }

    // }, []) // render only once initially.
    

    
    const addPost = (post) => {

        const newPostAction = {
            type: "NEW_POST",
            payload:post
        }

        dispatchList(newPostAction);

    }

    const deletePost = (postid) => {
        const deletePostAction = {
            type: "DELETE_POST",
            payload: {
                id:postid
            }
        }
        

        dispatchList(deletePostAction);
    }


   


    return (

            <PostListContext.Provider value={
                {
                    PostList:PostList,
                    addPost:addPost,
                    deletePost:deletePost
                }
            }>
                {children}
            </PostListContext.Provider>
        
    )

}

// const DefaultPostList = [
//     {
//         id: 1,
//         title: "Going to Muabai",
//         body: "I am going to Muabai to enjoy my summer Vacation ",
//         reaction: 2,
//         userID: "user1",
//         tags: ["Vacation", "Enjoyment"]


//     },

//     {
//         id: 2,
//         title: "Graduation Complete",
//         body: "I have completed my graduation degreee from Delhi University.. ",
//         reaction: 20,
//         userID: "user2",
//         tags: ["Graduation", "Placement"]


//     }
// ]

export default PostListProvider;
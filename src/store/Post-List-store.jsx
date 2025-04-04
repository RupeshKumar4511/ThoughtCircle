import { createContext, useReducer,useEffect } from "react";

// function fetchData(){
//     useEffect(()=>{
//     return async () =>{
//             const res = await fetch('http://localhost:5000/yourposts');
//             const data = await res.json();
//             return data;
//         }
//     },[]) 
// } 

// const PostLists = fetchData();

export const PostListContext = createContext({
    PostList:[],
    addPost: () => {},
    deletePost: () => {}
})


const postListReducer = (currentPostList, action) => {
    let newPostList = currentPostList;
    if(action.type === "DELETE_POST"){
        newPostList = currentPostList.filter((post)=>  post.id !== action.payload.id);

    }else if(action.type === "ADD_INITIAL_POSTS"){
        newPostList = action.payload.posts;
    }
    else if(action.type === "NEW_POST"){
        newPostList = [action.payload,... currentPostList]
        console.log(newPostList);
    }
    
    return newPostList;
}

const PostListProvider = ({ children }) => {

    
    // const [fetching, setFetching] = useState(false);

    const [PostList, dispatchList] = useReducer(postListReducer, []);

    const addPost = (post) => {
        // let id;
        // if (PostList.length === 0) {
        //     id = 0;
        // } else {
        //     id = PostList[PostList.length-1].id + 1;
        // }

        const newPostAction = {
            type: "NEW_POST",
            payload:post
        }

        dispatchList(newPostAction);

    }

    // const addInitialPosts = (posts) => {
       
    //     const newIntialPostAction = {
    //         type: "ADD_INITIAL_POSTS",
    //         payload: {
    //             posts:posts,

    //         }
    //     }

    //     dispatchList(newIntialPostAction);

    // }

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
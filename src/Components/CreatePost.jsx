import { useContext, useRef ,useEffect} from "react";
import { PostListContext } from "../store/Post-List-store";
import { useNavigate } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import {useForm} from 'react-hook-form';
export default function CreatePost() {

    // const { addPost } = useContext(PostListContext);
    // const navigate = useNavigate();

    // const postTitleElement = useRef();
    // const postContentElement = useRef();
    // const postTagsElement = useRef();
    // const postMediaElement = useRef();


    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     const postTitle = postTitleElement.current.value;
    //     const postContent = postContentElement.current.value;
    //     const postTags = postTagsElement.current.value.split(' ');
    // const postMedia = postMediaElement.current.value;

    // postTitleElement.current.value = "";
    // postContentElement.current.value = "";
    // postTagsElement.current.value = "";
    //  postMediaElement.current.value = "";



    

    // }


    const { register,formState:{errors}}=useForm();

    
            const formRef = useRef(null);
        
            useEffect(() => {
                const handleReset = () => {
                    formRef.current?.reset();  // Reset the form when event is triggered
                };
        
                window.addEventListener("clearPostForm", handleReset);
                return () => {
                    window.removeEventListener("clearPostForm", handleReset);
                };
            }, []);


    return (
        <Form method="POST" className="m-auto mt-5" style={{ 'width': '40rem', 'margin': 'auto' }} >

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input type="text" className="form-control" id="title"
                    placeholder="How are you feeling today.."
                    name="title" {...register("title",{required:"Title is required",pattern:{value:/\s/}})} />
                    <span style={{color:"red"}}>{errors.title?.message}</span>
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Post Content</label>
                <textarea type="text" rows="4" className="form-control"
                    placeholder="Tell us more about it"
                    id="body"
                    name="body" 
                    {...register("body",{required:"Post Content is required",pattern:{value:/\s/}})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Post Tags</label>
                <input type="text" className="form-control" id="tags"
                    placeholder="Enter your hashtags "
                    name="tags" 
                    {...register("tags",{required:"tags are required",pattern:{value:/\s/}})}/>
            </div>

            <div className="mb-3">
                <label htmlFor="photos" className="form-label">Post Image</label>
                <input type="file" name="image" className="form-control" id="image"  />
            </div> 

            <button type="submit" className="btn btn-primary">Post</button>
        </Form>
    );
}


export async function postDataAction(data) {

    const FormData = await data.request.formData();
    const postData = Object.fromEntries(FormData);
    postData.tags  = postData.tags.split(' ');
    
    try{
    
        const response =  await fetch('http://localhost:5000/create-post', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(postData)
         })
 
         if(response.ok){
          window.dispatchEvent(new Event("clearPostForm"));
          alert("Your Post Submitted Successfully..")
          return redirect('/');
          
         }
         else{
            return alert("Please Login First")
         }
         
     
     }catch(error){
         return alert("Please Login First")
     }
   

}
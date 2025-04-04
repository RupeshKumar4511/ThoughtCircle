import { Form, redirect } from "react-router-dom";
import {useEffect,useRef} from 'react';
export default function CreateUser(){
    const formRef = useRef(null);

    useEffect(() => {
        const handleReset = () => {
            formRef.current?.reset();  //  Reset the form when event is triggered
        };

        window.addEventListener("clearSignupForm", handleReset);
        return () => {
            window.removeEventListener("clearSignupForm", handleReset);
        };
    }, []);


   return(
    <Form ref={formRef} className="vh-100" method="POST" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{"border-radius": "1rem" ,"background-color": "#E5D0AC" }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign Up</h3>

                                <div data-mdb-input-init className="form-outline mb-4">
                                <input type="text" name="username" id="username" className="form-control form-control-md"  placeholder="Create Username"/>
                                   
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" name="password" id="password" className="form-control form-control-md"  placeholder="Create Password"/>
                                </div>

        

                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-md btn-block" type="submit">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
   ) 
}


export async function createUserAction(data) {

    
    const FormData = await data.request.formData();
    const postcreateUserData = Object.fromEntries(FormData);
    

    try{
    
       const response =  await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postcreateUserData)
        })

        if(response.ok){
         alert("SignUp Successfully..");
         window.dispatchEvent(new Event("clearSignupForm"));
         return redirect('/signin')
            
        }
        // const result = await response.json()
        // console.log(result);
    
    }catch(error){
        return alert("Enter the valid username and password",error)
    }
   
    

}
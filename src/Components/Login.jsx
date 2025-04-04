import { Form,redirect } from "react-router-dom";
import {useEffect,useRef} from 'react';
export default function Login() {

        const formRef = useRef(null);
    
        useEffect(() => {
            const handleReset = () => {
                formRef.current?.reset();  // Reset the form when event is triggered
            };
    
            window.addEventListener("clearLoginForm", handleReset);
            return () => {
                window.removeEventListener("clearLoginForm", handleReset);
            };
        }, []);

    return (

        <Form ref={formRef} method="POST" className="vh-100">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{"border-radius": "1rem" ,"background-color": "#AEEA94" }}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Sign in</h3>

                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="text" name="username" id="username" className="form-control form-control-md"  placeholder="Username"/>
                               
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="password"  name="password" className="form-control form-control-md"  placeholder="Password"/>
                            </div>

    

                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-md btn-block" type="submit">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    )
}


export async function LoginAction(data) {

    const FormData = await data.request.formData();
    // console.log(FormData);
    const loginData = Object.fromEntries(FormData);


    try{
    
        const response =  await fetch('http://localhost:5000/signin', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(loginData)
         })
 
         if(response.ok){
          window.dispatchEvent(new Event("clearLoginForm"));
          window.dispatchEvent(new Event("handlechange"));
          
          alert("SignIn Successfully..");
          return redirect('/create-post');
          
         }else{
            return alert("login Failed")
         }
         
     
     }catch(error){
         return alert("Enter the valid username and password",error)
     }
    
}
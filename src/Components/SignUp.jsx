import { Form,redirect } from "react-router-dom";
import {useEffect,useRef} from 'react';

export default function SignUp() {

              const formRef = useRef(null);
            
                useEffect(() => {
                    const handleReset = () => {
                        formRef.current?.reset();  // Reset the form when event is triggered
                    };
            
                    window.addEventListener("clearRegisterForm", handleReset);
                    return () => {
                        window.removeEventListener("clearRegisterForm", handleReset);
                    };
                }, []);
    

    return (

        <Form className="vh-100" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{"border-radius": "1rem" ,"background-color": "#FCD65A" }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign Up</h3>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" className="form-control form-control-md"  placeholder="Email"/>
                                   
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-md"  placeholder="Password"/>
                                </div>

        

                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-md btn-block" type="submit">Sign Up</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export async function RegisterAction() {

    // const FormData = await data.request.formData();
    // const signupData = Object.fromEntries(FormData);
   

    // fetch('https://dummyjson.com/posts/add', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(signupData)
    // }).then(res => res.json())
    //     .then(signup => {
    //         console.log(signup);
            
    //     })
    window.dispatchEvent(new Event("clearRegisterForm"));
        return redirect('/signup')
    // we will redirect it to create username and password
}
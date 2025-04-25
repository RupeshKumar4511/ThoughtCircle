import {useEffect,useState} from 'react';
function Header() {

  const [display, setDisplay] = useState("");
  const [display2, setDisplay2] = useState("d-none");
  useEffect(() => {
      const handleChange = () => {
          setDisplay('d-none');
          setDisplay2('d-inline')
      };

      window.addEventListener("handlechange", handleChange);
      return () => {
          window.removeEventListener("handlechange", handleChange);
      };
  }, []);
    return (
    
   <header className="p-3 bg-dark text-white" style={{"position":"sticky",'top':'0px','zIndex':'100'}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          {/* <li><a to="#" className="nav-link px-2 text-white">Home</a></li>
          <li><a to="#" className="nav-link px-2 text-white">Yout Post</a></li>
          <li><a to="#" className="nav-link px-2 text-white">Create Posts</a></li>
          <li><a to="#" className="nav-link px-2 text-white">Live Stream</a></li>*/}
          <h4 className='text-primary '> Seamlessly connect with your world</h4> 
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
        <a href="/signin" className={display} ><button type="button" className="btn btn-outline-light me-2" >Login</button></a>
          <a href="/register" className={display} ><button type="button" className="btn btn-warning">Sign-up</button></a>
        <h4 className={display2}>Welcome User</h4>
        </div>
      </div>
    </div>
  </header>

  );
}

export default Header;
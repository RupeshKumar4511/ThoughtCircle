import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({ isOpen,setOpen, children }) {
const navigate = useNavigate()
  return (
    createPortal(
      <div className={`fixed flex items-center px-4 justify-center inset-0 bg-black/40 ${isOpen ? '' : 'hidden'}`}
        onClick={() => {setOpen(false);
        navigate('/')}}>

        <div className="rounded-lg grow max-w-96 bg-white p-4 shadow-lg" onClick={(event) => event.stopPropagation()}>
          {children}        
        </div>
      </div>,
      document.getElementById('portal')
    )
  )
}
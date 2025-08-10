import { createPortal } from "react-dom";

export default function Modal({ isOpen,setOpen, children }) {
  return (
    createPortal(
      <div className={`absolute overflow-y-auto flex items-start md:items-center px-4 justify-center inset-0 bg-black/40 z-50 ${isOpen ? '' : 'hidden'}`}
        onClick={() => {setOpen(false);}}>

        <div className="rounded-lg grow max-w-96 bg-white p-4 shadow-lg w-full mt-12 mb-30 md:mt-20 md:mb-20" onClick={(event) => event.stopPropagation()}>
          {children}        
        </div>
      </div>,
      document.getElementById('portal')
    )
  )
}
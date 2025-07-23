import { useState } from "react"
import Modal from "./Modal"

const SuccessModal = ({message,handleClick}) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}
      children={
        <div className="flex flex-col flex-wrap">
          <h1 className="text-xl md:text-2xl text-blue-800 text-wrap">Message</h1>
          <div className="border-y border-black/10 py-5 ">
            <p className="text-xl md:text-2xl text-green-700">{message}</p>
          </div>
         <div className="flex justify-center py-1"> 
          <button className="py-1 px-5 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600" onClick={()=>handleClick(setOpen)}>OK</button></div>
        </div>}
    />
  )
}

export default SuccessModal

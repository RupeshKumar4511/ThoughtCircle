import Login from './Login'
import Modal from './Modal'
import { useState } from 'react'

const LoginModal = () => {
  const [isOpen, setOpen] = useState(true);
  
  return (
    <Modal children={<Login isOpen={isOpen} setOpen={setOpen} />} isOpen={isOpen} setOpen={setOpen}/>
  )
}

export default LoginModal

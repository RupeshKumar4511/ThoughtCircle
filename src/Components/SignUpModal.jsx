import SignUp from './SignUp'
import Modal from './Modal'
import { useState } from 'react'

const SignUpModal = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <Modal children={<SignUp  setOpen={setOpen} />} isOpen={isOpen} setOpen={setOpen}/>
  )
}

export default SignUpModal

import Login from './Login'
import Modal from './Modal'

const LoginModal = ({isOpen, setOpen}) => {
  
  
  return (
    <Modal children={<Login isOpen={isOpen} setOpen={setOpen} />} isOpen={isOpen} setOpen={setOpen}/>
  )
}

export default LoginModal

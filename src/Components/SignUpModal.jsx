import SignUp from './SignUp'
import Modal from './Modal'

const SignUpModal = ({isOpen, setOpen}) => {
  return (
    <Modal children={<SignUp  setOpen={setOpen} />} isOpen={isOpen} setOpen={setOpen}/>
  )
}

export default SignUpModal

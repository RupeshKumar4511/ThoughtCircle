import {useRouteError} from 'react-router-dom'
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className='flex flex-col justify-center items-center mx-auto'>
      <p className='text-red-500 text-2xl md:text-3xl z-10'>Something went wrong.</p>
      <h1>{error?error.status :''}</h1>
    </div>
  )
}

export default ErrorPage

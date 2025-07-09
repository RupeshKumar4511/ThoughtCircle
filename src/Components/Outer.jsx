import image from '../assets/pexels.jpg';
const Outer = () => {
  return (
     <div className="flex justify-center items-center gap-5 flex-col w-full mt-5">
                <img className="w-80 h-80 rounded-full" src={image} alt="image" />
                <h1 className="text-xl md:text-3xl font-semibold text-blue-600 text-center mx-5">Share your ideas and thoughts with the world</h1>
            </div>
  )
}

export default Outer

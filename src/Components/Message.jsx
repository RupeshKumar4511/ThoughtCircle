
export default function Message({user}){
    return(
        <div className="flex justify-center items-center flex-col w-full">
        <h2 className="md:text-xl">{user?'No posts yet':'There is no post.'}</h2>
        </div>
    );
}
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, BrowserRouter, createBrowserRouter } from 'react-router-dom';
import App from '../routes/App.jsx';
import PostList,{loadData} from './Components/PostList.jsx';
import UserPostList,{loadUserData} from './Components/UserPostList.jsx';
import Login ,{LoginAction} from './Components/Login.jsx'
import SignUp, { RegisterAction } from './Components/SignUp.jsx'
import CreateUser,{createUserAction} from './Components/CreateUser.jsx'
import CreatePost, { postDataAction } from './Components/CreatePost.jsx';


const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/', element: <PostList />, loader:loadData },
      { path: '/create-post', element: <CreatePost /> ,action:postDataAction},
      { path: '/yourposts', element: <UserPostList /> ,loader:loadUserData},
      { path: '/signin', element: <Login/>,action:LoginAction},
      { path: '/signup', element: <CreateUser/>,action:createUserAction},
      { path: '/register', element: <SignUp/>,action:RegisterAction},
    ]
  }, 
  

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

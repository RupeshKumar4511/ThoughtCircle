import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../routes/App.jsx';
import PostList from './Components/PostList.jsx';
import UserPostList from './Components/UserPostList.jsx';
import CreatePost from './Components/CreatePost.jsx';
import './index.css';
import Home from './Components/Home.jsx';
import CreateUser from './Components/CreateUser.jsx';
import Outer from './Components/Outer.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Profile from './Components/Profile.jsx';
import ResetPassword from './Components/ResetPassword.jsx';


const router = createBrowserRouter([
  
  {  path: '/', element: <Home />,children:[
    {path:'/',element:<Outer/>},
    { path: '/verify-email', element: <CreateUser/>},
    { path: '/reset-password', element: <ResetPassword/>},
    ]
  },
  {
    path: '/user', element: <App />, children: [
      { path: '/user/post', element: <PostList />},
      { path: '/user/create-post', element: <CreatePost /> },
      { path: '/user/user-post', element: <UserPostList /> },    
      { path: '/user/user-profile', element: <Profile /> },
    ]
  }, 
  

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../routes/App.jsx';
import PostList from './Components/PostList.jsx';
import UserPostList from './Components/UserPostList.jsx';
import CreatePost from './Components/CreatePost.jsx';
import './index.css';
import LoginModal from './Components/LoginModal.jsx';
import SignUpModal from './Components/SignUpModal.jsx';
import Home from './Components/Home.jsx';
import CreateUser from './Components/CreateUser.jsx';
import Outer from './Components/Outer.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';


const router = createBrowserRouter([
  
  {  path: '/', element: <Home />,children:[
    {path:'/',element:<Outer/>},
    { path: '/signin', element: <LoginModal/>},
      // ,action:LoginAction},
    { path: '/signup', element: <SignUpModal/>},
    // ,action:createUserAction},
    { path: '/verify-email', element: <CreateUser/>},
    ]
  },
  {
    path: '/:user', element: <App />, children: [
      { path: '/:user/post', element: <PostList />},
      // , loader:loadData },
      { path: '/:user/create-post', element: <CreatePost /> },
      { path: '/:user/user-post', element: <UserPostList /> },    
  
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

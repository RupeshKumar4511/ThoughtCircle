import Header from "../src/Components/Header.jsx";
import Footer from "../src/Components/Footer.jsx";
import SideBar from "../src/Components/SideBar.jsx";
import CreatePost from "../src/Components/CreatePost.jsx";
import PostList from '../src/Components/PostList.jsx';
import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import PostListProvider from "../src/store/Post-List-store.jsx";


function App() {
 

  return (
    <PostListProvider>


      <div className={styles.sidebar}>

        <SideBar />

        <div className={styles.content}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>


    </PostListProvider>

  )
}

export default App;

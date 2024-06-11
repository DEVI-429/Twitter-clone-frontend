import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Login  from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute'
import PageLoading from './pages/PageLoading';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Messages from './pages/Messages/Messages';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} >
          <Route index element={<Feed/>} />
        </Route>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} >
          <Route path='feed' element={<Feed/>}></Route>
          <Route path='explore' element={<Explore/>}></Route>
          <Route path='notifications' element={<Notifications/>}></Route>
          <Route path='lists' element={<Lists/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='more' element={<More/>}></Route>
          <Route path='bookmarks' element={<Bookmarks/>}></Route>
          <Route path='messages' element={<Messages/>}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pageloading" element={<PageLoading/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

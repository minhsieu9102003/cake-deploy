import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Admin/Admin';
import Home from './Home/Home';
import Login from './Login/Login';
import Main from './Main/Main';
import Quiz from './Quiz/Quiz';
import FlashCard from './Flash_card/Flash_card';
import Profile from './Profile/Profile';
import SignUp from './SignUp/SignUp';
import Folder from './Folder/Folder';
import Create_course from './create-course/create_course';
import UserCourse from './UserCourse/UserCourse';
import UserDetail from './UserDetail/UserDetail';
import CourseDetail from './CourseDetail/CourseDetail';
import Update_course from './update-course/update_course';

function App() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />

        <Route path="/" element={ token && userId ? <Main /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/flash_card/:courseId" element={<FlashCard />} />
        <Route path="/folder/:folderId" element={<Folder />} />
        <Route path="/create_course" element={<Create_course />} />
        <Route path="/folder/:folderId/create_course" element={<Create_course />} />
        <Route path="/usercourse" element={<UserCourse />} />
        <Route path="/userDetail/" element={<UserDetail />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/update_course/:courseId" element={<Update_course />} />
      </Routes>
    </Router>
  );
}

export default App;

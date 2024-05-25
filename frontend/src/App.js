import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Main from './Main/Main';
import Quiz from './Quiz/Quiz';
import FlashCard from './Flash_card/Flash_card';
import Folder from './Folder/Folder';
import SignUp from './SignUp/SignUp';
import Course from './Course/Course';
import Create_course from './create-course/create_course';
import UserCourse from './UserCourse/UserCourse';
import UserDetail from './UserDetail/UserDetail';
import CourseDetail from './CourseDetail/CourseDetail';
import Update_course from './update-course/update_course';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/flash_card/:courseId" element={<FlashCard />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/folder/:folderId" element={<Course />} /> {/* Updated route */}
        <Route path="/create_course" element={<Create_course />} />
        <Route path="/folder/:folderId/create_course" element={<Create_course />} />
        <Route path="/usercourse" element={<UserCourse />} />
        <Route path="/profile/" element={<UserDetail />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/update_course/:courseId" element={<Update_course />} />
      </Routes>
    </Router>
  );
}

export default App;

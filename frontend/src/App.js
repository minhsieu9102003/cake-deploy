import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Main from './Main/Main';
import Quiz from './Quiz/Quiz';
import FlashCard from './Flash_card/Flash_card';
import Folder from './Folder/Folder';
import SignUp from './SignUp/SignUp';
import Create_quiz from './Create_quiz/create_quiz';
import Create_flash from './Create_flash/Create_flash';
import Course from './Course/Course';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/flash_card" element={<FlashCard />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create_quiz" element={<Create_quiz />} />
        <Route path="/create_flash" element={<Create_flash />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </Router>
  );
}

export default App;

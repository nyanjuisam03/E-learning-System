import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login';
import SignUp from './signUp';
import Tutorhome from './tutor/tutorhome';
import StudentHome from './students/studenthome';
import Layout from './students/layout';
import CourseMake from './tutor/courseMake';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/tutor" element={<Tutorhome />} />
            <Route path="/student" element={<StudentHome />} />
            <Route path='/tutor-add' element={<CourseMake/>}/>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;

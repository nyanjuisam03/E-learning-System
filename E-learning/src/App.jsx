import { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Login from './login'
import SignUp from './signUp';
import Tutorhome from './tutor/tutorhome';
import StudentHome from './students/studenthome';
function App() {


  return (
    <>
<Router>
<Routes>
<Route path='/login' element={<Login />}/>
<Route path='/signUp' element={<SignUp/>}/>
<Route path='/tutor' element={<Tutorhome />}/>
<Route path='/student' element={<StudentHome />}/>
</Routes>
</Router>

    </>
  )
}

export default App

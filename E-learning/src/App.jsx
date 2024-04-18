import { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Login from './login'
import SignUp from './signUp';
function App() {


  return (
    <>
<Router>
<Routes>
<Route path='/login' element={<Login />}/>
<Route path='/signUp' element={<SignUp/>}/>
</Routes>
</Router>

    </>
  )
}

export default App

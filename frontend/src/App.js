import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ForgotPass from './pages/ForgotPass';
import Login from './pages/Login';
import './App.css';
import CreateAcc from './pages/CreateAcc';
function App() {
   return (
     <Router>
       <div className="App">
         <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/forgotpass" element={<ForgotPass />} />
           <Route path="/login" element={<Login />} /> 
           <Route path='/createacc' element={<CreateAcc />} />
         </Routes>
       </div>
     </Router>
   );
  }

export default App;
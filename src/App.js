import './App.css';
import Landing from './Components/LoginSignup/Landing';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';
import Forgot from './Components/LoginSignup/Forgot';
<<<<<<< Updated upstream
import Groups from './Components/LoginSignup/Groups';
function App() {
  return (
    <div>
      {/* <Landing/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Forgot/> */}
      <Groups/>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
      </Router>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;

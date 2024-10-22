import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import Groups from './Components/Groups';
//import CreateJournalPopup from './Components/LoginSignup/CreateJournalPopup'; // Correct import path
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/Groups" element={<Groups />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

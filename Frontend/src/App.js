import './App.css';
import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Forgot from './Components/Forgot';
import Groups from './Components/Groups';
import Reset from './Components/Reset';
import JournalOpen from './Components/JournalOpen';
import JournalEdit from './Components/JournalEdit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Groups" element={<Groups/>} />
          <Route path="/Forgot" element={<Forgot/>} />
          <Route path="/Reset" element={<Reset/>} />
          <Route path="/JournalOpen" element={<JournalOpen/>} />
          {/* <Route path="/JournalEdit" element={<JournalEdit/>} /> */}
          <Route path="/journal-edit/:journalId" element={<JournalEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

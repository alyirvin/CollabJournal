import './App.css';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';
import Forgot from './Components/LoginSignup/Forgot';
function App() {
  return (
    <div>
      <Signup/>
      <Login/>
      {/* <Forgot/> */}
    </div>
  );
}

export default App;

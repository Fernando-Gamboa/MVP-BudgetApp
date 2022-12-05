import React from 'react';
import {useState, useEffect} from 'react';
import App from './components/App.jsx';
import axios from 'axios';
import Login from './components/Login.jsx';
import SignUp from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


const RenderLogHome = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState();

  const getUserData = async (user) => {
    let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
    console.log(userData)
    setUserInfo(userData.data);
  };

  const createNewUser = async (user) => {
    let userDataPost = await axios.post(`/api/signup/${user.firebaseId}`, {params: user});
    if (userDataPost) {
      let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
      setUserInfo(userData.data);
    }
  };

  const clearUserInfo = () => {
    setUserInfo(null)
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login getUserData={getUserData}/>} render={() => {
            return (
                loggedIn ? <Navigate to="/home" /> : <Navigate to="/" />
            )
          }}/>
          <Route exact path="/" element={<Login getUserData={getUserData}/>}></Route>
          <Route exact path='/signup' element={<SignUp createNewUser={createNewUser}/>}></Route>
          <Route exact path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route exact path="/home" element={<App />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default RenderLogHome;

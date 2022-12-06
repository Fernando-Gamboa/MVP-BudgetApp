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
    console.log(user, 'inside getUserData ---')
    setUserInfo(user);
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
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route exact path="/home" element={<App userInfo={userInfo}/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default RenderLogHome;

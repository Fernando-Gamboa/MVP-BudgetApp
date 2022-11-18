import React from 'react';
import {useState, useEffect} from 'react';
import Login from './components/Login.jsx';
import App from './components/App.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


const RenderLogHome = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} render={() => {
            return (
                loggedIn ? <Navigate to="/home" /> : <Navigate to="/" />
            )
          }}/>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<App />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default RenderLogHome;

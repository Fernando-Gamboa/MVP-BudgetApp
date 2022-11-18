import React from 'react';
import logoNav from './logoNav.svg';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {
  const navigate = useNavigate();

  return (
    <section id='nav'>
      <div className='container-fluid'>
        {/* <!-- Nav Bar --> */}
        <nav className="navbar navbar-expand-lg navbar-dark">
          <img src={logoNav} className="navIcon navbar-brand" alt="logo"/>
          <a className="navbar-brand" style={{marginRight: '70px'}} href="http://localhost:3000">MyBudget</a>
          {/* resize icon button for drop down nav */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#budget">Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#transactions">Transactions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#goals">Goals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#logout" onClick={(e) => {
                  navigate('/')
                }}>Log out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Nav;

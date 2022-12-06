import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({createNewUser}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      let user = await signup(emailRef.current.value, passwordRef.current.value);

      console.log(user, 'THIS IS USER SIGN UP ---')
      addUser({
        username: user.email,
        password: passwordRef.current.value,
        firebaseId: user.firebaseId
      })
      navigate('/');
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // post new transactions -----
  const addUser = (obj) => {
    axios.post('http://localhost:3005/budget/user', {
      username: obj.username,
      password: obj.password,
      balance: "0",
      firebaseId: obj.firebaseId
    })
    .then(result => {
      console.log('CREATED USER')
    })
    .catch(err => console.log(err))
  }


  return (
    <section className="vh-100 gradient-custom" id='login'>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                {error && console.log('error', {error})}
                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={(e) => {
                  onSubmit(e);
                }}>
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                  <p className="text-white-50 mb-5">Please create your account</p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" ref={emailRef} placeholder="Enter email..." id="typeEmailX" className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" ref={passwordRef} placeholder="Enter password..." id="typePasswordX" className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                    <input type="password" ref={passwordConfirmRef} placeholder="Confirm password..." id="typePasswordX" className="form-control form-control-lg" />
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" disabled={loading} type="submit">Sign up</button>
                </form>

                <div>
                  <p className="mb-0">Already have an account? <Link className="text-white-50 fw-bold" to="/">Log in</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
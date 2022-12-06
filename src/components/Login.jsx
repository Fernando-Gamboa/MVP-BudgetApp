import React, {useRef, useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({getUserData}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const [loginExists, setLoginExists] = useState(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoginExists(true);
      setError('');
      setLoading(true);
      const user = await login(emailRef.current.value, passwordRef.current.value);
      if (user) {
        console.log(user, 'im logged in! ---------')
        getUserData(user);
        navigate('/home');
      }
    } catch (err) {
      setLoginExists(false);
      setError(err);
    }
    setLoading(false);
  };


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
                  // e.preventDefault();
                  // navigate('/home')
                }}>
                  <h2 className="fw-bold mb-2 text-uppercase">Log in</h2>
                  {loginExists ? <p className="text-white-50 mb-5">Please enter your email and password!</p>
                    : <p className="text-danger mb-5">Credentials don't match!</p>}

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" ref={emailRef} placeholder="Enter email..." id="typeEmailX" className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" ref={passwordRef} placeholder="Enter password..." id="typePasswordX" className="form-control form-control-lg" />
                  </div>

                  <p className="small mb-5 pb-lg-2"><Link className="text-white-50" to="/forgot-password">Forgot password?</Link></p>

                  <button className="btn btn-outline-light btn-lg px-5" disabled={loading} type="submit">Log in</button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>

                </form>

                <div>
                  <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to="/signup">Sign up</Link>
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

export default Login;
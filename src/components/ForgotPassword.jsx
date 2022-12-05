import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
    } catch(err){
      setError(err)
    }
    setLoading(false);
  }


  return (
    <section className="vh-100 gradient-custom" id='login'>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                {error && console.log('error', {error})}
                {message && console.log('success', {message})}
                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={(e) => {
                  onSubmit(e);
                }}>
                  <h2 className="fw-bold mb-2 text-uppercase">Password Reset</h2>
                  <p className="text-white-50 mb-5">Please enter your email to reset password</p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" ref={emailRef} placeholder="Enter email..." id="typeEmailX" className="form-control form-control-lg" />
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" disabled={loading} type="submit">Reset Password</button>
                </form>

                <div>
                  <p className="mb-0">Have an account? <Link className="text-white-50 fw-bold" to="/">Log in</Link>
                  </p>
                </div>
                <div>
                  <p className="mb-0">Need an account? <Link className="text-white-50 fw-bold" to="/signup">Sign up</Link>
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

export default ForgotPassword;
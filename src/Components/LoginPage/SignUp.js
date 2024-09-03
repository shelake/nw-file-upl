import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
 
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
 
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/', {
        username,
        email,
        password,
      });
      console.log(response.data); // Handle successful response as per your requirement
    } catch (error) {
      setError('Failed to create user');
    }
  };
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Username"
              required
            />
          </div>
 
          <div className="form-outline mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Email Address"
              required
            />
          </div>
 
          <div className="form-outline mb-4">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Password"
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
 
          <div className="form-outline mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Confirm Password"
              required
            />
          </div>
 
          {error && <div className="alert alert-danger">{error}</div>}
 
          <div className="text-center text-lg-start mt-3 pt-2">
       
           
           <p style={{paddingLeft:'30%', paddingRight:"30%"}}> <button
              type="submit"
              className="btn btn-primary btn-lg"
             
             
              >
         <center>Sign Up</center>
            </button></p>
           
 
            <div className="divider d-flex align-items-center my-4"  style={{paddingLeft:'40%', paddingRight:"40%"}}>
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
 
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p className="lead fw-normal mb-0 me-3">Sign up with</p>
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <FaFacebookF />
              </button>
 
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <FaTwitter />
              </button>
 
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <FaLinkedinIn />
              </button>
            </div>
 
            <p className="small fw-bold mt-2 pt-1 mb-0" ><center>
              Already have an account? <a href="/" className="link-danger">Login</a></center>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default Signup;
 
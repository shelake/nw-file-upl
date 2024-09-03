import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";
import * as Components from './components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signIn, toggleSignIn] = useState(true);
  const [username, setUsername] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [email, setEmail] = useState({ value: '', error: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!username.value || !password.value) {
      toast.error("Username and password are required");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/search/${username.value}`);
      const userData = response.data;
      if (userData.password === password.value) {
        localStorage.setItem('User', JSON.stringify(userData));
        navigate("/home");
      } else {
        toast.error("Username or password is invalid");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username.value || !email.value || !password.value || !confirmPassword.value) {
      toast.error("All fields are required");
      return;
    }

    if (password.value !== confirmPassword.value) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userData = { username: username.value, email: email.value, password: password.value };
      await axios.post('http://localhost:8080/api/v1/users/', userData);
      toast.success("User signed up successfully");
      toggleSignIn(true);
    } catch (error) {
      toast.error("An error occurred during sign-up");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Components.Container>
      <ToastContainer />
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Username" value={username.value} onChange={(e) => setUsername({ value: e.target.value, error: false })} />
          <Components.Input type="text" placeholder="Email" value={email.value} onChange={(e) => setEmail({ value: e.target.value, error: false })} />
          <Components.Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password.value} onChange={(e) => setPassword({ value: e.target.value, error: false })} />
          <Components.Input type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword.value} onChange={(e) => setConfirmPassword({ value: e.target.value, error: false })} />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="text" placeholder="Username" value={username.value} onChange={(e) => setUsername({ value: e.target.value, error: false })} />
          <Components.Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password.value} onChange={(e) => setPassword({ value: e.target.value, error: false })} />
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggleSignIn(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggleSignIn(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Login;

import React, { useState } from "react";
import axios from 'axios';
import { apiUrl } from '../utils/api';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialState = {
    username: '',
    password: ''
  };
  const [ credentials, setCredentials ] = useState(initialState);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios.post(`${apiUrl}/login`, credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);

        // *!* TODO: Redirect
      })
      .catch(err => console.warn(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username:</p>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

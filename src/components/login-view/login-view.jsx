import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './login-view.scss';

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios.post('https://my-flix-48028.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Form className="LoginForm">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter password" type="Password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button id="btn-yellow" variant="warning" type="submit" size="lg" onClick={handleSubmit}>
        Login
      </Button>
      <Link to={'/register'}>
        <Button id="btn-yellow-new" variant="warning" type="submit" size="lg">
          Register
        </Button>
      </Link>
    </Form >
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};
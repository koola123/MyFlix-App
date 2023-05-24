import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import axios from "axios";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://my-blockbusters.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        alert("Registration failed")
        console.log(e,"User registration failed");
      });
  };

  return (
    <Form className="registrationForm">
      <h1>Welcome to MyFlix!</h1>
      <Form.Group controlId="formUsername">
        <Form.Control
          type="text"
          placeholder="Username"
          size="sm"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          size="sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Control
          type="email"
          placeholder="Email"
          size="sm"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthdate">
        <Form.Control
          type="date"
          size="sm"
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button id="reg-btn-color" type="submit" onClick={handleSubmit}>
        Signup
      </Button>
      <span className="reg-text">Already have an account?</span>
      <Link to={"/"}>
        <span className="reg-signup">Login</span>
      </Link>
    </Form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};

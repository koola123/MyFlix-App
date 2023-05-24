import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./login-view.scss";

import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    axios
      .post("https://my-blockbusters.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((event) => {
        alert("Login failed");
        console.log("no such user");
      });
  };

  return (
    <Form className="LoginForm">
      <h1>Welcome to MyFlix!</h1>
      <p className="title-brand">"The Ultimate Star Wars Movies Collection"</p>
      <Form.Group controlId="formUsername">
        <Form.Control
          placeholder="Username"
          size="sm"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Control
          placeholder="Password"
          size="sm"
          type="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        id="login-btn-color"
        variant="secondary"
        type="submit"
        size="lg"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <span className="login-text">Don't have an account?</span>
      <Link to={"/register"}>
        <span className="login-signup">Sign up</span>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

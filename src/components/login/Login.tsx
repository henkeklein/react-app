import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";
import { makeLogin } from "../request/Requests";
import MFA from "./2fa";
import ReactDOM from "react-dom/client";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  async function handleSubmit(event:any) {
    event.preventDefault();
    let data = await makeLogin ({username: email, password: password});
    if (data.requires2FA) {
      const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
      );
      root.render(
        <MFA username={email} password={password} />
      )
    }
  }

  return (

    <div className="Login">

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="email">

          <Form.Label>Username</Form.Label>

          <Form.Control

            autoFocus

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </Form.Group>

        <Form.Group controlId="password">

          <Form.Label>Password</Form.Label>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>

        <Button variant="primary" size="sm" type="submit" disabled={!validateForm()}>

          Login

        </Button>

      </Form>
    </div>


  );

}
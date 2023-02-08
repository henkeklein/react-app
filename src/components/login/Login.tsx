import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";
import { makeLogin } from "../request/Requests";
import MFA from "./2fa";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  async function handleSubmit(event:any) {
    event.preventDefault();
    let data = await makeLogin ({username: email, password: password});
    console.log(data);
    if (data.requires2FA) {
      return (
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

        <Button size="lg" type="submit" disabled={!validateForm()}>

          Login

        </Button>

      </Form>

    </div>

  );

}
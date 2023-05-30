import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import { searchCocktailByName } from "../request/Requests";
import { searchCocktailByIngredient } from "../request/Requests";
import ReactDOM from "react-dom/client";

export default function Cocktails() {

  const [text, setSearch] = useState("");


  async function search(event:any) {
    event.preventDefault();
    let data = await searchCocktailByName(text);

    
  }

  return (

    <div className="Login">

      <Form onSubmit={search}>

        <Form.Group controlId="email">

          <Form.Label>Search</Form.Label>

          <Form.Control

            autoFocus

            value={text}

            onChange={(e) => setSearch(e.target.value)}

          />

        </Form.Group>

        <Button variant="primary" size="sm" type="submit">

          Search

        </Button>

      </Form>
    </div>


  );

}
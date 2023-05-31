import React, { ReactNode, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import './Cocktails.css';
import { searchCocktailByName } from "../request/Requests";
import { searchCocktailByIngredient } from "../request/Requests";
import { getCocktailById } from "../request/Requests";
import ReactDOM from "react-dom/client";


export default function Cocktails() {

  const [text, setSearch] = useState("");
  const [checked, setChecked] = useState(false);
  const [drinksById, addDrink]: any = useState({});
  const [listItems, setDrinks] = useState([]);

  let displayData: any = [];

  async function search(event: any) {
    event.preventDefault();
    let data = checked ? await searchCocktailByIngredient(text) : await searchCocktailByName(text);

    setDrinks(data.drinks || []);
  }

  function handleChange() {
    setChecked(!checked);
  }

  function Drink(props: any) {
    if (props.item.idDrink !== drinksById.idDrink) {
      return null;
    }
    const ingredients = [];
    for (var prop in drinksById) {
      if (prop.indexOf('strIngredient') >= 0) {
        if (drinksById[prop]) {
          let i = prop.split('strIngredient')[1];
          let str = drinksById[`strMeasure${i}`] || '';
          str += drinksById[prop];
          ingredients.push(str);
        }
      }
    }

    return <div className="align-top d-inline-flex" style={{ maxWidth: '60%' }}>
      <div className="m-5 align-top d-inline-flex card card-body">
      <h5>
        Ingredients
      </h5>
      <ul>
        {ingredients.map((i: any) => { return <li>{i}</li> })}
      </ul>
    </div>
      <div style={{ maxWidth: '30%' }} className="m-5 align-top d-inline-flex card card-body">
        <h5>
          Instructions
        </h5>
        <article>
          {drinksById.strInstructions}
        </article>
      </div>
      </div>
  }

  async function updateClicked(item: any) {
    let data = await getCocktailById(item.idDrink);
    addDrink(data.drinks[0])
  }

  function MapDrink(props: any) {
    const ingredients = [];
    for (var prop in props.item) {
      if (prop.indexOf('strIngredient') >= 0) {
        if (props.item[prop]) {
          let i = prop.split('strIngredient')[1];
          let str = props.item[`strMeasure${i}`] || '';
          str += props.item[prop];
          ingredients.push(str);
        }
      }
    }
    return <li key={props.item.idDrink} className="list-group-item">
      <h3>
        {props.item.strDrink}
      </h3>
      <img className="rounded" style={{ maxHeight: '300px', maxWidth: '300px' }} src={props.item.strDrinkThumb}></img>
      {
        checked &&
        <div className="m-1 align-top d-inline-flex">
          <button className="btn btn-secondary" onClick={() => updateClicked(props.item)}>Ingredients</button>
        </div>
      }
      {checked && drinksById ? <Drink item={props.item} /> : null}
      {
        !checked &&
        <div className="m-5 align-top d-inline-flex card card-body">
          <h5>
            Ingredients
          </h5>
          <ul>
            {ingredients.map((i: any) => { return <li>{i}</li> })}
          </ul>
        </div>
      }
      {
        !checked &&
        <div style={{ maxWidth: '30%' }} className="m-5 align-top d-inline-flex card card-body">
          <h5>
            Instructions
          </h5>
          <article>
            {props.item.strInstructions}
          </article>
        </div>
      }
    </li>;
  }

  return (

    <><div className="Main">

      <Form onSubmit={search}>

        <Form.Group controlId="email" style={{ display: 'flex' }}>

          <Form.Control

            autoFocus

            value={text}

            onChange={(e) => setSearch(e.target.value)} />
          <Button variant="secondary" size="sm" type="submit">

            Search

          </Button>
        </Form.Group>

        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          Search by ingredient
        </label>

      </Form>
    </div>
      <div>
        <ul className="list-group">
          {listItems.map((item: any) => <MapDrink item={item} />)}
        </ul>
      </div></>

  );

}
import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "0c522b62";
  const APP_KEY = "fa4b640b01f02d79c746bbc4fd9640f6";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  //can't access variable before initializing, ${query}
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    // console.log("Effect has been run");
    getRecipes();
  }, [query]);
  //second arg: when value changes, useEffect runs
  //only gonna run when we click submit button

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

    // fetch(exampleReq).then((response) => {
    //   response.json();
    // });
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    //console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.url}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import Search from "./Search";
import GenreFilter from './GenreFilter';
import ResultsSort from './ResultsSort';
import ResultContainer from './ResultContainer';
import "./App.scss";

const App = () => {
  return (
    <>
      <h1 className="title">FIND YOUR MOVIE</h1>
      <Search />
      <GenreFilter/>
      <ResultsSort/>
      <ResultContainer/>
    </>
  );
};

export default App;

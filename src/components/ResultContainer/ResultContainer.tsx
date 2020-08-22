import React, { Component } from "react";
import { Form } from "react-bootstrap";
import MovieCard from '../MovieCard';

import movies from '../../data/movies.json';

const ResultContainer:React.FC = () => {
    return (
        <ul className="row list-unstyled list">
            {movies.map((movie) => {
                return <MovieCard key={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date}/>;
            })}
        </ul>
       
    )
}

export default ResultContainer;
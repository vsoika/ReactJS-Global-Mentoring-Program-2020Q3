import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoMovieFound: React.FC = () => {
  return (
    <Container className="text-center mx-auto">
      <h3 className="text-white">NO MOVIE FOUND</h3>
      <Link to="/">GO BACK TO HOME</Link>
    </Container>
  );
};

export default NoMovieFound;

import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

const NoMovieFound: React.FC = () => {
  return (
    <Container className="text-center mx-auto">
      <h3 className="text-white">NO MOVIE FOUND</h3>
      <Link href="/">GO BACK TO HOME</Link>
    </Container>
  );
};

export default NoMovieFound;

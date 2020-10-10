import React from "react";
import { Image, Container } from "react-bootstrap";
import imagePath from "../../assets/icons/noFound.png";
import imageMobilePath from "../../assets/icons/noFound-mobile.png";
import { Link } from 'react-router-dom';

const NoMatch: React.FC = () => {
  return (
    <Container className="text-center">
      <h2 className="text-white mt-5">PAGE NOT FOUND</h2>
      <Image
        className="d-md-block d-none mx-auto"
        src={imagePath}
        alt="Not Found"
      ></Image>
      <Image
        className="d-md-none d-block mx-auto"
        src={imageMobilePath}
        alt="Not Found"
      ></Image>
      <Link to="/">GO BACK TO HOME</Link>
    </Container>
  );
};

export default NoMatch;

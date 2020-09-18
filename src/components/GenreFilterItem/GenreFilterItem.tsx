import React from "react";
import { Nav } from "react-bootstrap";

interface IGenreFilterItemProps {
  genre: string;
}

const GenreFilterItem: React.FC<IGenreFilterItemProps> = ({ genre }) => {
  return (
    <Nav.Item>
      <Nav.Link eventKey={genre}>{genre}</Nav.Link>
    </Nav.Item>
  );
};

export default GenreFilterItem;

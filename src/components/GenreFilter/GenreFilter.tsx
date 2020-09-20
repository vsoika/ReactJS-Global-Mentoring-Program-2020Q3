import React, { useState } from "react";
import { Nav, Col } from "react-bootstrap";
import GenreFilterItem from "../GenreFilterItem";
import { GENRE_OPTIONS } from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface IGenreFilterProps {
  handleGenreFilter: (genre: string) => void;
}

const GenreFilter: React.FC<IGenreFilterProps> = ({ handleGenreFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSelect = (eventKey) => {
    setSelectedGenre(eventKey);
    handleGenreFilter(eventKey);
  };

  return (
    <Col md={9} xs={12} className="mb-4">
      <Nav
        className="justify-content-md-start justify-content-center"
        variant="pills"
        activeKey={selectedGenre || GENRE_OPTIONS.all}
        onSelect={(e) => handleSelect(e)}
      >
        {Object.values(GENRE_OPTIONS).map((genre) => {
          return <GenreFilterItem key={uuidv4()} genre={genre} />;
        })}
      </Nav>
    </Col>
  );
};

export default GenreFilter;

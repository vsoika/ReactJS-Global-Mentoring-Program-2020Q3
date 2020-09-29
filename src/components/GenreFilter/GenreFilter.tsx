import React from "react";
import { Nav, Col } from "react-bootstrap";
import GenreFilterItem from "../GenreFilterItem";
import { GENRE_OPTIONS } from "../../constants";
import { v4 as uuidv4 } from "uuid";

import { setGenre, getFilteredMovies } from "../../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

const GenreFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedGenre = useSelector((store: RootState) => store.movies.selectedGenre);
  console.log(selectedGenre);

  const handleSelect = (eventKey: string) => {
    dispatch(setGenre(eventKey));
    dispatch(getFilteredMovies());
  };

  return (
    <Col md={9} xs={12} className="mb-4">
      <Nav
        className="justify-content-md-start justify-content-center"
        variant="pills"
        activeKey={selectedGenre}
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

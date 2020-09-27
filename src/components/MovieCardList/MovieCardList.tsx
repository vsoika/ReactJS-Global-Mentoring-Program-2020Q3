import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCardItem from "../MovieCardItem";

import "./MovieCardList.scss";

interface IResultContainerProps {
  movieList: any[];
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
  showMovieDetails: (id: string) => void;
}

const MovieCardList: React.FC<IResultContainerProps> = ({
  movieList,
  allMoviesList,
  handleSuccessEdit,
  showMovieDetails,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <ul className="list-unstyled list movies-list">
          {movieList.map((movie) => {
            return (
              <MovieCardItem
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                allMoviesList={allMoviesList}
                handleSuccessEdit={handleSuccessEdit}
                showMovieDetails={showMovieDetails}
              />
            );
          })}
        </ul>
      </Col>
    </Row>
  );
};

export default MovieCardList;

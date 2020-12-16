import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MovieCardItem from "../MovieCardItem";

import { getFilteredMovies } from "../../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { IFormikValues } from '../../constants';

const MovieCardList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilteredMovies());
  }, [dispatch]);

  const filteredMoviesList = useSelector(
    (store: RootState) => store.movies.filteredMoviesList
  );

  return (
    <Row>
      <Col xs={12}>
        <ul className="list-unstyled list movies-list">
          {filteredMoviesList.map((movie: IFormikValues) => {
            return (
              <MovieCardItem
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
              />
            );
          })}
        </ul>
      </Col>
    </Row>
  );
};

export default MovieCardList;

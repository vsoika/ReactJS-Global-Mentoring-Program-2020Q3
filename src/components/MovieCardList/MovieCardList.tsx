import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MovieCardItem from "../MovieCardItem";

import "./MovieCardList.scss";

import { getFilteredMovies } from '../../store/actionCreators';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

interface IResultContainerProps {
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
  showMovieDetails: (id: string) => void;
}

const MovieCardList: React.FC<IResultContainerProps> = ({
  handleSuccessEdit,
  showMovieDetails,
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilteredMovies());
  }, [dispatch]);

  const filteredMoviesList = useSelector((store: RootState) => store.movies.filteredMoviesList);

  console.log(filteredMoviesList)

  return (
    <Row>
      <Col xs={12}>
          <ul className="list-unstyled list movies-list">
            {filteredMoviesList.map((movie) => {
              return (
                <MovieCardItem
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  release_date={movie.release_date}
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

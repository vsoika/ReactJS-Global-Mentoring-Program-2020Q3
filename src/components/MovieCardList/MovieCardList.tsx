import React, { useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import MovieCardItem from "../MovieCardItem";

import fetchMovies from "../../store/actionCreators";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import "./MovieCardList.scss";

interface IResultContainerProps {
  movieList: any[];
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
  fetchMovies: () => void;
  showMovieDetails: (id: string) => void;
}

const MovieCardList: React.FC<IResultContainerProps> = ({
  // movieList,
  allMoviesList,
  handleSuccessEdit,
  fetchMovies,
  showMovieDetails,
}) => {
  useEffect(() => {
    fetchMovies();
  }, []);

  const movies = useSelector((store: any) => store);
  const { moviesList, pending } = movies;

  console.log(movies);

  return (
    <Row>
      <Col xs={12}>
        {pending ? (
          <Spinner className="mx-auto" animation="border" variant="danger" />
        ) : (
          <ul className="list-unstyled list movies-list">
            {moviesList.map((movie) => {
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
        )}
      </Col>
    </Row>
  );
};

// const mapStateToProps = state => ({
//   moviesList: state.moviesList,
// });

export default connect(null, { fetchMovies })(MovieCardList);

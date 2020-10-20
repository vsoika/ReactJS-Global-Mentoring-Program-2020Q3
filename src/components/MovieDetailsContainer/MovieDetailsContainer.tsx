import React, { useEffect } from "react";
import Main from "../Main";
import MovieDetails from "../MovieDetails";
import { Spinner } from "react-bootstrap";

import { fetchMoviesById } from "../../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { useParams } from "react-router-dom";

const MovieDetailsContainer: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesById(id));
  }, [id]);

  const store = useSelector((store: RootState) => store.search);
  const { fulfilledById } = store;

  return (
    <>
      {!fulfilledById ? (
        <Spinner className="mx-auto" animation="border" variant="danger" />
      ) : (
        <>
          <div className="bg-wrapper">
            <MovieDetails />
          </div>
          <Main />
        </>
      )}
    </>
  );
};

export default MovieDetailsContainer;

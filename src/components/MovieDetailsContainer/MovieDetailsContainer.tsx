import React from "react";
import Main from "../Main";
import MovieDetails from "../MovieDetails";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

const MovieDetailsContainer: React.FC = () => {
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

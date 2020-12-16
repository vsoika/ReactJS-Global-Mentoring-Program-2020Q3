import React from "react";
import Main from "../Main";
import SearchContainer from "../SearchContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import Router, { useRouter } from "next/router";

const App: React.FC = (): JSX.Element => {
  const router = useRouter();
  const isSearch = router.route === "/search";
  const movies = useSelector((store: RootState) => store.movies);
  const { isFiltered, filteredMoviesList } = movies;

  if (isFiltered && !filteredMoviesList.length && isSearch) {
    Router.push("/no-movie-found");
  }

  return (
    <>
      <SearchContainer />
      <Main />
    </>
  );
};

export default App;

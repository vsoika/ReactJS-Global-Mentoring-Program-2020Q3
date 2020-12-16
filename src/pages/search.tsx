import { useEffect } from "react";
import { useDispatch } from "react-redux";
import App from "../components/App";
import {
  getMoviesBySearchInput,
} from "../store/actionCreators";

import { useRouter } from "next/router";
import { NextPage } from 'next';

const Search: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { title } = router.query;

  const dispatch = useDispatch();

  useEffect(() => {
    if (title) {
      dispatch(getMoviesBySearchInput(title));
    }
  }, [title]);

  return <App />;
};

export default Search;

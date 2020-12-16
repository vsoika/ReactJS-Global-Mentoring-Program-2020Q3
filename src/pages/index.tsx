import { useEffect } from "react";
import { useDispatch } from "react-redux";
import App from "../components/App";
import { getFilteredMovies, pushMoviesToStore } from "../store/actionCreators";
import { MOVIES_DATA_URL, IFormikValues } from "../constants";
import { NextPage } from 'next';

interface IProps {
  initialDataFromServer?: IFormikValues[];
}

const Index: NextPage<IProps> = ({ initialDataFromServer }): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialDataFromServer) {
      dispatch(pushMoviesToStore(initialDataFromServer));
      dispatch(getFilteredMovies());
    }
  }, [dispatch]);

  return <App />;
};

Index.getInitialProps = async () => {
  const response = await fetch(MOVIES_DATA_URL);
  const data = await response.json();

  return {
    initialDataFromServer: data.data,
  };
};

export default Index;

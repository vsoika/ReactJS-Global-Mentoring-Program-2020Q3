import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushMovieById } from "../../store/actionCreators";
import { MOVIES_DATA_URL, IFormikValues } from "../../constants";
import MovieDetailsContainer from "../../components/MovieDetailsContainer";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

interface IProps {
  id: string;
  movie: IFormikValues;
}

type Params = {
  id: string;
};

const MovieDetailsPage: NextPage<IProps> = ({ id, movie }): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie) {
      dispatch(pushMovieById(movie));
    }
  }, [id]);

  return <MovieDetailsContainer />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const response = await fetch(`${MOVIES_DATA_URL}/${id}`);
  const movie = await response.json();

  return {
    props: { id, movie },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(MOVIES_DATA_URL);
  const movies = await response.json();

  return {
    paths: movies.data.map((movie) => {
      return {
        params: {
          id: movie.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export default MovieDetailsPage;

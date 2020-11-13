import App from "./components/App";
import NoMatch from "./components/404page";
import MovieDetailsContainer from "./components/MovieDetailsContainer";
import NoMovieFound from "./components/NoMovieFound";

const Routes = [
  {
    ...App,
    path: "/",
    exact: true,
  },
  {
    ...MovieDetailsContainer,
    path: "/film/:id",
  },
  {
    ...App,
    path: "/search/:value",
  },
  {
    path: "/no-movie-found",
    component: NoMovieFound,
  },
  {
    path: "/404",
    component: NoMatch,
  },
  {
    component: NoMatch,
  },
];

export default Routes;

import { Provider } from "react-redux";
import { useStore } from "../store";
import { AppProps } from "next/app";

import "../components/App/App.scss";
import "../components/MovieCardList/MovieCardList.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/MovieDetails/MovieDetails.scss";


export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

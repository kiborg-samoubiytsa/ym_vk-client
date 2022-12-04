import { FC, useState } from "react";
import "./App.scss";
import Player from "./Player/Player";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserPlaylistsPage } from "./pages/UserPlaylistsPage";
import Header from "./Header/Header";
import CurrentQueuePage from "./CurrentQueue/CurrentQueue";
import { Auth } from "./pages/Auth/Auth";
import { UserAlbumsPage } from "./pages/UserAlbumsPage";
import { UserPodcastsPage } from "./pages/UserPodcastsPage";
const App: FC = () => {
  //TODO менять текущий плейлист только по нажатию на трек
  const [isQueueDisplayed, setIsQueueDisplayed] = useState(false);

  return (
    <>
      <Provider store={store}>
        {localStorage.getItem("user-data") ? (
          <Router>
            {isQueueDisplayed ? (
              <div>
                <CurrentQueuePage setIsQueueDisplayed={setIsQueueDisplayed} />
              </div>
            ) : (
              <div className="Content">
                <Header />
                <Routes>
                  <Route
                    path="/playlists"
                    element={<UserPlaylistsPage />}
                  ></Route>
                  <Route path="/albums" element={<UserAlbumsPage />}></Route>
                  <Route
                    path="/podcasts"
                    element={<UserPodcastsPage />}
                  ></Route>
                </Routes>
              </div>
            )}
            <Player
              isQueueDisplayed={isQueueDisplayed}
              setIsQueueDisplayed={setIsQueueDisplayed}
            />
          </Router>
        ) : (
          <Auth />
        )}
      </Provider>
    </>
  );
};

export default App;

import { FC, useEffect, useState } from "react";
import "./App.scss";
import Player from "../Player/Player";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserPlaylistsPage } from "../pages/UserPlaylistsPage";
import Header from "./Header";
import CurrentQueuePage from "../CurrentQueue/CurrentQueue";
import { Auth } from "../pages/Auth/Auth";
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

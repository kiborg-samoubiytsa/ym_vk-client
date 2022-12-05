import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "./Header.module.scss";
import { MdOutlineExitToApp } from "react-icons/md";
import { IconContext } from "react-icons";
const Header: FC<{}> = () => {
  const handleAccountExit = () => {
    localStorage.removeItem("user-data");
    sessionStorage.removeItem("user-playlists");
    window.location.reload();
  };
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  return (
    <nav className={styles.header}>
      <div className={styles.contentContainer}>
        <ul className={styles.optionsList}>
          <li>
            <Link to={`users/${userData.uid}/playlists/`}>Плейлисты</Link>
          </li>
          <li>
            <Link to={`users/${userData.uid}/albums`}>Альбомы</Link>
          </li>
          <li>
            <Link to={`users/${userData.uid}/podcasts`}>Подкасты и Книги</Link>
          </li>
        </ul>
        <div className={styles.exitButtonContainer}>
          <IconContext.Provider value={{ size: "24" }}>
            <MdOutlineExitToApp
              onClick={handleAccountExit}
              className={styles.exitButton}
            />
          </IconContext.Provider>
        </div>
      </div>
    </nav>
  );
};

export default Header;

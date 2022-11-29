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
  return (
    <div className={styles.header}>
      <ul className={styles.optionsList}>
        <li>
          <Link to="/playlists">ПЛЕЙЛИСТЫ</Link>
        </li>
        <li>
          <Link to="/albums">АЛЬБОМЫ</Link>
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
  );
};

export default Header;

import { FC, useState } from "react";
import { Link } from "react-router-dom";
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
    <ul className={styles.header}>
      <li className="">
        <Link to="/playlists">ПЛЕЙЛИСТЫ</Link>
      </li>
      <IconContext.Provider value={{ size: "24" }}>
        <MdOutlineExitToApp
          onClick={handleAccountExit}
          className={styles.exitButton}
        />
      </IconContext.Provider>
    </ul>
  );
};

export default Header;

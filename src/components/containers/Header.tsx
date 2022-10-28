import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import classnames from "classnames";
const Header: FC<{}> = () => {
  return (
    <ul className={styles.header}>
      <li className="">
        <Link to="/playlists">ПЛЕЙЛИСТЫ</Link>
      </li>
    </ul>
  );
};

export default Header;

import React from "react";
import { UserPlaylists } from "../containers/UserPlaylists";
import { SideBar } from "../Playlist/Sidebar";
import styles from "../Playlist/Sidebar.module.scss";

export const UserPlaylistsPage = () => {
  return (
    <div className="User-playlists">
      <UserPlaylists />
      <SideBar styles={styles} />
    </div>
  );
};

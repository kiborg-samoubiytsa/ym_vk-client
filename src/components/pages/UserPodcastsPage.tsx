import React from "react";
import { UserPodcasts } from "../containers/UserPodcasts";
import { Sidebar } from "../Sidebar/Sidebar";

export const UserPodcastsPage = () => {
  return (
    <div className="User-Collection">
      <UserPodcasts />
      <Sidebar />
    </div>
  );
};

import React from "react";
import { UserPodcasts } from "../UserPages/UserPodcasts";
import { TracksSidebar } from "../Sidebar/TrackQueueSidebar/TracksSidebar";

export const UserPodcastsPage = () => {
  return (
    <div className="User-Collection">
      <UserPodcasts />
      <TracksSidebar />
    </div>
  );
};

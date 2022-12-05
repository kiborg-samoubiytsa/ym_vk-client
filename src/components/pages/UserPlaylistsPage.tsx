import { UserPlaylists } from "../UserPages/UserPlaylists";
import { TracksSidebar } from "../Sidebar/TrackQueueSidebar/TracksSidebar";

export const UserPlaylistsPage = () => {
  return (
    <div className="User-Collection">
      <UserPlaylists />
      <TracksSidebar />
    </div>
  );
};

import { UserPlaylists } from "../UserPages/UserPlaylists";
import { TracksSidebar } from "../Sidebar/TracksSidebar";
import { Sidebar } from "../Sidebar/Sidebar";

export const UserPlaylistsPage = () => {
  return (
    <div className="User-Collection">
      <UserPlaylists />
      <Sidebar />
    </div>
  );
};

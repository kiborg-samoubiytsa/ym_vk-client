import { UserPlaylists } from "../containers/UserPlaylists";
import { Sidebar } from "../Sidebar/Sidebar";

export const UserPlaylistsPage = () => {
  return (
    <div className="User-Collection">
      <UserPlaylists />
      <Sidebar />
    </div>
  );
};

import { UserAlbums } from "../containers/UserAlbums";
import { Sidebar } from "../Sidebar/Sidebar";

export const UserAlbumsPage = () => {
  return (
    <div className="User-Collection">
      <UserAlbums />
      <Sidebar />
    </div>
  );
};

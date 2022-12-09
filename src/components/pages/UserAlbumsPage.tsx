import { UserAlbums } from "../UserPages/UserAlbums";
import { Sidebar } from "../Sidebar/Sidebar";

export const UserAlbumsPage = () => {
  return (
    <div className="User-Collection">
      <UserAlbums />
      <Sidebar />
    </div>
  );
};

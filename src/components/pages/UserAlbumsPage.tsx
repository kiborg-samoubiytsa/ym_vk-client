import { UserAlbums } from "../containers/UserAlbums";
import { SideBar } from "../Sidebar/Sidebar";

export const UserAlbumsPage = () => {
  return (
    <div className="User-Collection">
      <UserAlbums />
      <SideBar />
    </div>
  );
};

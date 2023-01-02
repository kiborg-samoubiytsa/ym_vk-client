import { UserAlbums } from "../UserPages/UserAlbums";
import { Sidebar } from "../Sidebar/Sidebar";
import { useSelectedItemReset } from "../../hooks/useSelectedItemReset";

export const UserAlbumsPage = () => {
  useSelectedItemReset();
  return (
    <div className="User-Collection">
      <UserAlbums />
      <Sidebar />
    </div>
  );
};

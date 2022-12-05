import { UserAlbums } from "../UserPages/UserAlbums";
import { TracksSidebar } from "../Sidebar/TrackQueueSidebar/TracksSidebar";

export const UserAlbumsPage = () => {
  return (
    <div className="User-Collection">
      <UserAlbums />
      <TracksSidebar />
    </div>
  );
};

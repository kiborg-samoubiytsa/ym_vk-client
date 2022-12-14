import "./Sidebar.scss";
import { useSelector } from "react-redux";
import {
  isCollectionSelected,
  isTrackSelected,
} from "../../store/reducers/selectedItemSlice";
import { TracksSidebar } from "./TracksSidebar";
import { SingleTrackSidebar } from "./SingleTrackSidebar";

export const Sidebar = () => {
  const isCollection = useSelector(isCollectionSelected);
  const isTrack = useSelector(isTrackSelected);
  console.log(isTrack);
  return (
    <div className="sidebar">
      {isCollection ? (
        <TracksSidebar />
      ) : isTrack ? (
        <SingleTrackSidebar />
      ) : (
        <div className="sidebar"></div>
      )}
    </div>
  );
};

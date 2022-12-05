import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./PlaylistPage.scss";

export const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { data, error, state } = useFetch("");
  useEffect(() => {
    console.log(playlistId);
  });
  return <div className="content">PlaylistPage</div>;
};

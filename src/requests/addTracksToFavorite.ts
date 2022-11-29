import axios from "axios";
export const addTracksToFavorite = async (
  trackId: string | number,
  albumId: string | number
) => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  await axios.post(
    `http://localhost:3002/tracks/favorite/add-multiple/username=${userData.username}/password=${userData.password}/track-ids=${trackId}:${albumId}`,
    `${trackId}:${albumId}`
  );
};

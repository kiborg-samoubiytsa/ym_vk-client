import axios from "axios";

export const removeFromFavorite = async (trackId: string | number) => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  console.log(trackId);
  await axios.post(
    `http://localhost:3002/tracks/favorite/remove/username=${userData.username}/password=${userData.password}/track-ids=${trackId}`
  );
};

import axios from "axios";
export const getTrackFromCollection = async (url: string) => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const { data } = await axios.get(
    `${url}/username=${userData.username}/password=${userData.password}`
  );
  return data;
};

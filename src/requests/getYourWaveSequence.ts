import axios from "axios";

export const getYourWaveSequence = async () => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const sequence = await axios.get(
    `http://localhost:3002/rotor/station=user:onyourwave/username=${userData.username}/password=${userData.password}`
  );
  return sequence.data.result.sequence;
};

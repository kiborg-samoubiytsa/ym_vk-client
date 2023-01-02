import axios from "axios";

export const getYourWaveSequence = async () => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const sequence = await axios.get(
    `https://zvuk-ponosa.glitch.me/api/rotor/station=user:onyourwave/uid=${userData.uid}/token=${userData.token}`
  );
  return sequence.data.result.sequence;
};

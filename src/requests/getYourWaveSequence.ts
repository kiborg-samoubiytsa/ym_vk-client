import axios from "axios";

export const getYourWaveSequence = async (
  username: string,
  password: string
) => {
  const sequence = await axios.get(
    `http://localhost:3002/rotor/username=${username}/password=${password}`
  );
  return sequence.data.result.sequence;
};

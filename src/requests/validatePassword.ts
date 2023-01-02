import axios from "axios";

export const validatePassword = async (
  username: string | undefined,
  password: string | undefined
) => {
  try {
    if (username && password) {
      const { data } = await axios.get(
        `https://zvuk-ponosa.glitch.me/validate-password/username=${username}/password=${password}`
      );
      return data;
    }
  } catch (error) {
    return false;
  }
};

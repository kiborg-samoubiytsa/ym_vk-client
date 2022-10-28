import axios from "axios";

export const validatePassword = async (
  username: string | undefined,
  password: string | undefined
) => {
  try {
    if (username && password) {
      await axios.get(
        `http://localhost:3002/validate-password/username=${username}/password=${password}`
      );
      return true;
    }
  } catch (error) {
    return false;
  }
};

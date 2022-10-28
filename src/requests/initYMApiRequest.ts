import axios from "axios";

export const initYMApi = async () => {
  await axios.get("http://localhost:3002");
};

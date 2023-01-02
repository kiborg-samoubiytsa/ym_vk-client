import axios from "axios";
import { RotorSettings2 } from "../types/types";
export const getRotorSettings = async (): Promise<RotorSettings2> => {
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const { data } = await axios.get(
    `https://zvuk-ponosa.glitch.me/api/rotor/info/token=${userData.token}`
  );
  return data;
};

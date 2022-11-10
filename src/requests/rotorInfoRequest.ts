import axios from "axios";
import { RotorSettings2 } from "../types/types";
export const getRotorSettings = async (): Promise<RotorSettings2> => {
  const { data } = await axios.get("http://localhost:3002/rotor/info");
  return data;
};

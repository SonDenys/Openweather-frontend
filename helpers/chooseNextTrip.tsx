import axios from "axios";
import { BACKEND_URL } from "@/params";

export const chooseNextTrip = async (city1: string, city2: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/chooseNextTrip?city1=${city1}&city2=${city2}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

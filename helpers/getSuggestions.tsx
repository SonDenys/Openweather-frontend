import { BACKEND_URL } from "@/params";
import axios from "axios";

export const getSuggestions = async (cityName: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/autocomplete?q=${cityName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

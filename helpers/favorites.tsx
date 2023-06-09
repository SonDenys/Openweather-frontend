import axios from "axios";
import { BACKEND_URL } from "@/params";

export const addFavorite = async (
  cityName: string,
  temperature: number,
  humidity: number,
  clouds: number
) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/favorites/add`, {
      cityName,
      temperature,
      humidity,
      clouds,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/favorites`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorites = async (cityName: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/favorites/delete`, {
      cityName,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

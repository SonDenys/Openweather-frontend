import { Typography } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ThermostatIcon from "@mui/icons-material/Thermostat";

interface FavoriteCityInterface {
  cityName: string;
  temperature: number;
  humidity: number;
  clouds: number;
}

export default function FavoriteComponent(props: FavoriteCityInterface) {
  return (
    <div className="p-5">
      <Typography variant="body2" color="text.secondary">
        <div className="flex text-gray-700">
          <LocationCityIcon />
          <div className="font-bold">Ville : {props.cityName}</div>
        </div>

        <div className="flex text-gray-700">
          <ThermostatIcon />

          {props.temperature ? (
            <div>Température : {props.temperature.toFixed(0)}°C</div>
          ) : (
            <div>Température : {props.temperature}°C</div>
          )}
        </div>

        <div className=" text-gray-700">💧 Humidité : {props.humidity}%</div>
        <div className=" text-gray-700">☁ Taux de nuage : {props.clouds}%</div>
      </Typography>
    </div>
  );
}

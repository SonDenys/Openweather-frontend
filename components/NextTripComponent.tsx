import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ThermostatIcon from "@mui/icons-material/Thermostat";

export interface NextTripProps {
  cityName: string;
  score: number;
  temperature: number;
  humidity: number;
  clouds: number;
  image?: string;
  handleAddFavorite?: any;
  sameResult: boolean;
}

export default function NextTrip(props: NextTripProps) {
  return (
    <div className="text-cyan-700 text-center">
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <div className="">
            {props.sameResult ? (
              <Typography gutterBottom variant="h5" component="div">
                Ta prochaine destination reste {props.cityName} 👊👊 !
              </Typography>
            ) : (
              <Typography gutterBottom variant="h5" component="div">
                Ta prochaine destination est {props.cityName} ✨ !
              </Typography>
            )}
          </div>

          <div>
            <Typography variant="body2" color="text.secondary">
              <div className="flex justify-center text-gray-700">
                <LocationCityIcon />
                <div>Ville : {props.cityName}</div>
              </div>

              <div className="flex justify-center text-gray-700">
                <ThermostatIcon />
                <div>Température : {props.temperature.toFixed(0)}°C</div>
              </div>

              <div className="pl-1 text-gray-700">
                💧 Humidité : {props.humidity}%
              </div>
              <div className="pl-1 text-gray-700">
                ☁ Taux de nuage : {props.clouds}%
              </div>
              <div className="flex justify-center text-emerald-700 mt-2">
                <SportsScoreIcon />
                <div className="font-bold text-lg">Score : {props.score}</div>
              </div>
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </div>
  );
}

export interface nextTripProps {
  cityName: string;
  score: number;
  temperature: number;
  humidity: number;
  clouds: number;
}

export default function NextTrip(props: nextTripProps) {
  return (
    <>
      <div className="text-gray-900">
        <h2>Ta prochaine destination !</h2>
        <div>
          <div>Ville : {props.cityName}</div>
          <div>Température : {props.temperature.toFixed(0)}°C</div>
          <div>Humidité : {props.humidity}%</div>
          <div>Taux de nuage : {props.clouds}%</div>
        </div>
      </div>
      <div>
        <div>Score : {props.score}</div>
      </div>
    </>
  );
}

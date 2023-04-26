import { Inter } from "next/font/google";
import { TextField, Autocomplete, Card, CardActions } from "@mui/material";
import { useState } from "react";
import { chooseNextTrip } from "@/helpers/chooseNextTrip";
import { useRouter } from "next/router";
import { addFavorite } from "@/helpers/favorites";
import NextTripComponent from "@/components/NextTripComponent";
import { getSuggestions } from "@/helpers/getSuggestions";
import LayoutComponent from "@/components/LayoutComponent";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";

interface NextTripInterface {
  city: string;
  score: number;
  temp: number;
  humidity: number;
  clouds: number;
}

export default function Home() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [nextTrip, setNextTrip] = useState<NextTripInterface>();
  const [suggestions, setSuggestions] = useState([]);
  const [sameResult, setSameResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [prevResult, setPrevResult] = useState("");
  const router = useRouter();

  const handleChooseNextTrip = async (city1: string, city2: string) => {
    try {
      if (city1 === city2) {
        setErrorMessage(
          "Les 2 villes sélectionnées sont les mêmes, veuillez corriger"
        );
        return;
      }

      const result = await chooseNextTrip(city1, city2);
      if (result && result.data) {
        if (JSON.stringify(result.data) === JSON.stringify(prevResult)) {
          console.log("Le résultat est toujours le même");
          setSameResult(true);
        } else {
          setNextTrip(result.data);
          setPrevResult(result.data);
          setSameResult(false);
          setErrorMessage("");
        }
      } else {
        setErrorMessage("Les 2 champs ne sont pas correctement remplis");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAddFavorite = async (
    cityName: string,
    temperature: number,
    humidity: number,
    clouds: number
  ) => {
    try {
      const response = await addFavorite(
        cityName,
        temperature,
        humidity,
        clouds
      );
      if (response) {
        router.push("/favoritesPage");
      } else {
        setErrorMessage("Cette ville fait déjà partie de tes favoris");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestions = async (cityName: string) => {
    try {
      const result = await getSuggestions(cityName);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (event: any, value: string) => {
    if (value.length > 2) {
      const suggestions = await fetchSuggestions(value);
      setSuggestions(suggestions);
    }
  };

  return (
    <LayoutComponent>
      <main className="pt-10 ">
        <div className="flex">
          <Autocomplete
            sx={{
              minWidth: 300,
              paddingRight: 5,
            }}
            freeSolo
            options={suggestions}
            inputValue={city1}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                id="=city1"
                label="1ère ville"
                variant="outlined"
                onChange={(event) => setCity1(event.target.value)}
              />
            )}
          />

          <Autocomplete
            sx={{ minWidth: 300, paddingLeft: 5 }}
            freeSolo
            options={suggestions}
            inputValue={city2}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                id="city2"
                label="2ème ville"
                variant="outlined"
                onChange={(event) => setCity2(event.target.value)}
              />
            )}
          />
        </div>

        <div className="text-center mt-5">
          <CompareArrowsIcon
            onClick={() => handleChooseNextTrip(city1, city2)}
            className="cursor-pointer"
          />
          {errorMessage && (
            <div className="flex justify-center text-red-600 text-sm mt-5">
              <ErrorIcon />
              <p>{errorMessage}</p>
              <ErrorIcon />
            </div>
          )}
        </div>

        <div>
          {nextTrip && (
            <>
              <Card sx={{ minWidth: 345, marginTop: 5 }}>
                <NextTripComponent
                  cityName={nextTrip.city}
                  score={nextTrip.score}
                  temperature={nextTrip.temp}
                  humidity={nextTrip.humidity}
                  clouds={nextTrip.clouds}
                  sameResult={sameResult}
                />
                <CardActions>
                  <div className="m-auto">
                    <AddCircleOutlineIcon
                      onClick={() =>
                        handleAddFavorite(
                          nextTrip.city,
                          nextTrip.temp,
                          nextTrip.humidity,
                          nextTrip.clouds
                        )
                      }
                      className="text-cyan-700 cursor-pointer"
                    />
                  </div>
                </CardActions>
              </Card>
            </>
          )}
        </div>
      </main>
    </LayoutComponent>
  );
}

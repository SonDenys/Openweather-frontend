import { Inter } from "next/font/google";
import { TextField, Autocomplete, Card, CardActions } from "@mui/material";
import { useState } from "react";
import { chooseNextTrip } from "@/helpers/chooseNextTrip";
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import { addFavorite } from "@/helpers/favorites";
import NextTrip from "@/components/NextTrip";
import { getSuggestions } from "@/helpers/getSuggestions";
import LayoutComponent from "@/components/LayoutComponent";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const inter = Inter({ subsets: ["latin"] });

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
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChooseNextTrip = async (city1: string, city2: string) => {
    if (!city1 || !city2) {
      setErrorMessage("Au moins une ville est manquante");
    }
    try {
      const result = await chooseNextTrip(city1, city2);
      if (result && result.data) {
        setNextTrip(result.data);
        setErrorMessage("");
        console.log("result === ", result);
      } else {
        setErrorMessage("Il y'a une erreur sur une des villes sélectionnées");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAddFavorite = async (cityName: string) => {
    try {
      await addFavorite(cityName);
      router.push("/favoritesPage");
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
        </div>

        <div id="react-tooltip-root"></div>

        <div>
          {nextTrip && (
            <>
              <Card sx={{ minWidth: 345, marginTop: 5 }}>
                <NextTrip
                  cityName={nextTrip.city}
                  score={nextTrip.score}
                  temperature={nextTrip.temp}
                  humidity={nextTrip.humidity}
                  clouds={nextTrip.clouds}
                />
                <CardActions>
                  <div className="m-auto">
                    {/* <Button
                      size="small"
                      color="primary"
                      onClick={() => handleAddFavorite(nextTrip.city)}
                      className="text-cyan-700 text-xs"
                    >
                      Ajouter en favoris
                    </Button> */}

                    <AddCircleOutlineIcon
                      onClick={() => handleAddFavorite(nextTrip.city)}
                      className="text-cyan-700 cursor-pointer"
                    />
                  </div>
                </CardActions>
              </Card>
            </>
          )}
        </div>
        <p>{errorMessage}</p>
      </main>
    </LayoutComponent>
  );
}

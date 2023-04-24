import { Inter } from "next/font/google";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { chooseNextTrip } from "@/helpers/chooseNextTrip";
import { useRouter } from "next/router";
import Link from "next/link";

import { addFavorite } from "@/helpers/favorites";
import NextTrip from "@/components/NextTrip";

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
  const router = useRouter();

  const handleChooseNextTrip = async (city1: string, city2: string) => {
    try {
      const result = await chooseNextTrip(city1, city2);
      if (result && result.data) {
        setNextTrip(result.data);
      }
      console.log("reponse chooseNextTrip ==", nextTrip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFavorite = async (cityName: string) => {
    try {
      const result = await addFavorite(cityName);
      console.log("favoriteCity ===", result?.data);
      router.push("/favoritesPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`bg-white flex min-h-screen flex-col items-center justify-evenly ${inter.className}`}
    >
      <Link href="/favoritesPage">
        <div>
          <Button variant="outlined">Les favoris</Button>
        </div>
      </Link>

      <div className="">
        <TextField
          id="standard-basic"
          label="1ère ville"
          variant="standard"
          value={city1}
          onChange={(event) => setCity1(event.target.value)}
        />
        <TextField
          id="standard-basic"
          label="2ème ville"
          variant="standard"
          value={city2}
          onChange={(event) => setCity2(event.target.value)}
        />
        <Button
          variant="contained"
          className="bg-slate-500"
          onClick={() => handleChooseNextTrip(city1, city2)}
        >
          Comparer
        </Button>
      </div>
      <div>
        {nextTrip && (
          <div className="">
            <NextTrip
              cityName={nextTrip.city}
              score={nextTrip.score}
              temperature={nextTrip.temp}
              humidity={nextTrip.humidity}
              clouds={nextTrip.clouds}
            />
            <Button
              variant="outlined"
              onClick={() => handleAddFavorite(nextTrip.city)}
            >
              Ajouter en favoris
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

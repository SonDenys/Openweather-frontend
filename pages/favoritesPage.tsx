import { getFavorites } from "@/helpers/favorites";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@mui/material";

export const inter = Inter({ subsets: ["latin"] });

export default function favoritesPage() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFavorites();
        if (response && response.data) {
          setFavorites(response.data.favorites);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main
      className={`bg-white flex min-h-screen flex-col items-center justify-evenly ${inter.className}`}
    >
      <Link href="/">
        <div>
          <Button variant="outlined">Accueil</Button>
        </div>
      </Link>
      <div>
        {favorites.map((favorite: any) => (
          <div key={favorite._id}>{favorite.cityName}</div>
        ))}
      </div>
    </main>
  );
}

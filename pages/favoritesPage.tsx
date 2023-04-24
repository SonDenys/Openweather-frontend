import { deleteFavorites, getFavorites } from "@/helpers/favorites";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button, ToggleButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

  const handleDeleteFavorite = async (cityName: string) => {
    try {
      await deleteFavorites(cityName);
      const newResponse = await getFavorites();
      if (newResponse && newResponse.data) {
        setFavorites(newResponse.data.favorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`bg-white flex min-h-screen flex-col items-center justify-evenly ${inter.className}`}
    >
      <Link href="/">
        <div>
          <Button variant="outlined">Accueil</Button>
        </div>
      </Link>
      <div className="text-gray-900">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite: any) => (
            <div key={favorite._id} className="flex">
              <div>{favorite.cityName}</div>
              <DeleteForeverIcon
                color="warning"
                className="cursor-pointer"
                onClick={() => handleDeleteFavorite(favorite.cityName)}
              ></DeleteForeverIcon>
            </div>
          ))
        ) : (
          <div className="text-red-400">Aucun favori pour le moment</div>
        )}
      </div>
    </main>
  );
}

import { deleteFavorites, getFavorites } from "@/helpers/favorites";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LayoutComponent from "@/components/LayoutComponent";
import { Card, Grid } from "@mui/material";
import FavoriteCityComponent from "@/components/FavoriteCityComponent";
import ReactLoading from "react-loading";

export const inter = Inter({ subsets: ["latin"] });

export default function favoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFavorites();
        if (response && response.data) {
          setFavorites(response.data.favorites);
          setIsLoading(false);
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
        setFavorites(newResponse.data.favorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="spin" color="#4F46E5" height={150} width={150} />
    </div>
  ) : (
    <LayoutComponent>
      <main className="mt-10 p-10">
        <Grid container spacing={4} className="text-gray-900">
          {favorites && favorites.length > 0 ? (
            favorites.map((favorite: any) => (
              <Grid item key={favorite._id}>
                <Card sx={{ minWidth: 235 }}>
                  <div className="flex justify-between">
                    <FavoriteCityComponent
                      cityName={favorite.cityName}
                      temperature={favorite.temperature}
                      humidity={favorite.humidity}
                      clouds={favorite.clouds}
                    />
                    <DeleteForeverIcon
                      color="warning"
                      className="cursor-pointer"
                      onClick={() => handleDeleteFavorite(favorite.cityName)}
                    ></DeleteForeverIcon>
                  </div>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="text-gray-600 text-sm mt-5">
              Aucun favori pour le moment
            </div>
          )}
        </Grid>
      </main>
    </LayoutComponent>
  );
}

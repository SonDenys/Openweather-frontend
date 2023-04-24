import { getSuggestions } from "@/helpers/getSuggestions";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const fetchSuggestions = (cityName: string) => {
  try {
    const result = getSuggestions(cityName);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const AutocompleteComponent = () => {
  // État local pour stocker la valeur courante de l'entrée de recherche
  const [searchCity, setSearchCity] = useState("");
  // État local pour stocker les suggestions de villes retournées par l'API
  const [suggestions, setSuggestions] = useState([]);

  // Fonction appelée lorsqu'un utilisateur saisit ou modifie une recherche
  const handleInputChange = async (event: any, value: any) => {
    setSearchCity(value);
    if (value.length > 2) {
      const suggestions = await fetchSuggestions(value);
      setSuggestions(suggestions);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      inputValue={searchCity}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Recherche de ville"
          variant="outlined"
          value={searchCity}
        />
      )}
    />
  );
};

export default AutocompleteComponent;

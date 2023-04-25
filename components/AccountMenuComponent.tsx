import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function AccountMenuComponent() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        <Link href="/">
          <div>
            <Typography
              sx={{ minWidth: 100 }}
              className="cursor-pointer text-cyan-600"
            >
              Accueil
            </Typography>
          </div>
        </Link>

        <Link href="/favoritesPage">
          <div>
            <Typography
              sx={{ minWidth: 100 }}
              className="cursor-pointer text-cyan-600"
            >
              Favoris
            </Typography>
          </div>
        </Link>
      </Box>
    </React.Fragment>
  );
}

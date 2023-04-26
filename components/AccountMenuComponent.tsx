import * as React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function AccountMenuComponent() {
  const router = useRouter();

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
              className={`cursor-pointer ${
                router.pathname === "/"
                  ? "text-cyan-500 underline decoration-slice"
                  : "text-slate-600 hover:underline decoration-slate-600"
              }`}
            >
              Accueil
            </Typography>
          </div>
        </Link>

        <Link href="/favoritesPage">
          <div>
            <Typography
              sx={{ minWidth: 100 }}
              className={`cursor-pointer ${
                router.pathname === "/favoritesPage"
                  ? "text-cyan-500"
                  : "text-slate-600 hover:underline decoration-slate-600"
              }`}
            >
              Favoris
            </Typography>
          </div>
        </Link>
      </Box>
    </React.Fragment>
  );
}

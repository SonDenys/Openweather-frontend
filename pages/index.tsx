import Image from "next/image";
import { Inter } from "next/font/google";
import { TextField } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`bg-white flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex justify-betweend">
        <TextField id="standard-basic" label="Pays1" variant="standard" />
        <TextField id="standard-basic" label="Pays2" variant="standard" />
      </div>
    </main>
  );
}

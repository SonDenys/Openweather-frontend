import React from "react";
import AccountMenuComponent from "./AccountMenuComponent";
import { inter } from "@/pages/favoritesPage";

interface LayoutInterface {
  children: any;
}
export default function LayoutComponent(props: LayoutInterface) {
  return (
    <div
      className={`bg-white flex flex-col justify-center items-center ${inter.className}`}
    >
      <div className="mt-20 text-cyan-700 font-bold text-3xl">
        METEO sur les 5 prochains jours
      </div>
      <AccountMenuComponent />
      {props.children}
    </div>
  );
}

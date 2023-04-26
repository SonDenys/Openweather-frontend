import React from "react";
import AccountMenuComponent from "./AccountMenuComponent";
import { inter } from "@/pages/favoritesPage";

interface LayoutInterface {
  children: any;
}
export default function LayoutComponent(props: LayoutInterface) {
  return (
    <div
      className={` bg-slate-100 flex flex-col items-center ${inter.className}`}
    >
      <p className="mt-20 text-cyan-700 font-bold text-3xl">
        METEO sur les 5 prochains jours
      </p>
      <p className="pt-1 text-xs text-gray-500">basé sur l'api OpenWeather</p>
      <AccountMenuComponent />
      {props.children}
    </div>
  );
}

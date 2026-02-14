import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";



function Settings(){

    return (
      <div className="flex gap-1 border w-full mx-1">
        <nav className="flex flex-col gap-4 border border-yellow-500 py-1">
          <NavLink
            to=""
            end
            className={({ isActive }) => {
              return cn("settingsNavLink", isActive && "dark:text-purple-800 dark:bg-background text-purple-500 bg-stone-300");
            }}
          >
            Profile Settings
          </NavLink>
          <NavLink
            to={"Appearance"}
            className={({ isActive }) => {
              return cn("settingsNavLink", isActive && "dark:text-purple-800 dark:bg-background text-purple-500 bg-stone-300");
            }}
          >
            Appearance
          </NavLink>
          <NavLink
            to={"Stats"}
            className={({ isActive }) => {
              return cn("settingsNavLink", isActive && "dark:text-purple-800 dark:bg-background text-purple-500 bg-stone-300");
            }}
          >
            Stats
          </NavLink>
        </nav>

        <main className="flex-1 border border-purple-500">
          <Outlet />
        </main>
      </div>
    );
}

export default Settings;
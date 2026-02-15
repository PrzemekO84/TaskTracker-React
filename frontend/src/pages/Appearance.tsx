import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

function Appearance(){

    const [openedSection, setSectionOpen] = useState<boolean>(false);

    const { theme, changeTheme } = useThemeContext();


    return (
    <div className="flex flex-col gap-2 justify-center">
      <h1 className="text-3xl lg:text-4xl py-3 text-center">
        Profile Appearance
      </h1>
      <div className="flex flex-col gap-3 p-1">
        <div className="border-2 rounded-md p-1">
          <button
            className="w-full p-2 flex items-center justify-between"
            onClick={() => {
              setSectionOpen(!openedSection)
            }}
          >
            Change Dark/Light Mode {" "}
            <ArrowDown
              className={cn(
                "transition-transform duration-300",
                openedSection === true && "rotate-180",
              )}
              size={18}
            />
          </button>
        </div>
        <div
          className={cn(
            "grid transition-all ease-in-out duration-300",
            openedSection === true
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-3 border-2 px-1 py-2 rounded-md">
              <button 
              onClick={changeTheme}
              className={cn("flex items-center justify-center gap-2 border-2 p-3 rounded-md", theme === "dark" && "bg-purple-950")}>Dark Mode <Moon /> </button>
              <button 
              onClick={changeTheme}
              className={cn("flex items-center justify-center gap-2 border-2 p-3 rounded-md text-white", theme === "light" && "bg-purple-950")}>Light Mode <Sun /> </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
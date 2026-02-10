import { Button } from "./Components/ui/button";
import { Switch } from "./Components/ui/switch";
import { Link } from "react-router-dom";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { Menu } from "lucide-react";
import { HamburgerMenu } from "./Components/ui/HamburgerMenu";


//Mozna by dodac hamburger jesli zmniejszy sie jeszcze bardziej
//Zmiana ikony przy dark/light mode
// Chyba done - Trzeba cos wymyslic z home/task/settings bo nie sa wycentrowane idealnie przez duzy prawy div ale to po dark mode zeby lepiej to dostosowac

function Header() {
  return (
    <div className="border-b-2 border-stone-900 pb-6 shadow-md shadow-violet-300/20 bg-stone-900">
      <div className="flex justify-between mt-5 mx-3 h-auto ">
        <div className="flex gap-8 justify-center items-center">
          <Link to="/" className="flex gap-3 justify-center items-center">
            <h1 className="text-4xl font-semibold text-purple-800 text-shadow-md/10 text-shadow-white">
              Voyager
            </h1>
            <CircleGauge className="mt-3" />
          </Link>
          <div className="hidden sm:flex gap-5 justify-center mt-1 items-center text-xl lg:text-2xl 2xl:text-3xl">
            <Link className=" p-2 rounded-xl linkHighlight " to="/">
              Home
            </Link>
            <Link className=" p-2 rounded-xl linkHighlight" to="/Tasks">
              Tasks
            </Link>
            <Link className=" p-2 rounded-xl linkHighlight" to="Settings">
              Settings
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex gap-4 justify-center items-center mr-1 text-xl mt-1">
          <div className="border-2 border-purple-900 p-2 rounded-xl linkHighlight">
            <Link to={"/Signup"}> <button>Sign Up</button> </Link>
          </div>
          <div className="border-2 border-purple-900 p-2 rounded-xl linkHighlight">
            <Link to={"/Login"}> <button>Sign In</button> </Link>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Switch className="border border-whites" />
            <Moon />
            {/* <Sun /> */}
          </div>
        </div>

        <div className="flex sm:hidden items-center mt-2">
          <HamburgerMenu />   
        </div>
      </div>
    </div>
  );
}

export default Header;

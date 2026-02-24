import { Button } from "./Components/ui/button";
import { Switch } from "./Components/ui/switch";
import { Link } from "react-router-dom";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { Menu } from "lucide-react";
import { HamburgerMenu } from "./pages/HamburgerMenu";
import { useThemeContext } from "./context/ThemeContext";
import { useUserContext } from "./context/UserContext";
import { CircleUserRound } from "lucide-react";

function Header() {

  const { theme, changeTheme } = useThemeContext();
  const { user, logoutUser } = useUserContext();

  return (
    <div className="border-b-2 border-stone-900 pb-6 shadow-md shadow-violet-300/20 bg-stone-900">
      <div className="flex justify-between mt-5 mx-3 h-auto ">
        <div className="flex gap-8 justify-center items-center">
          <Link to="/" className="flex gap-3 justify-center items-center">
            <h1 className="text-4xl font-semibold text-purple-700 text-shadow-md/10 text-shadow-white">
              Voyager
            </h1>
            <CircleGauge className="mt-3 text-white" />
          </Link>
          <div className="hidden md:flex gap-5 justify-center mt-1 items-center text-xl lg:text-2xl 2xl:text-3xl text-white">
            {user.username === "" ? (
              <Link className=" p-2 rounded-xl linkHighlight " to="/">
                Home
              </Link>
            ) : (
              <>
                <Link className=" p-2 rounded-xl linkHighlight " to="/">
                  Dashboard
                </Link>
                <Link
                  className=" p-2 rounded-xl linkHighlight text-white"
                  to="/Tasks"
                >
                  Tasks
                </Link>
                <Link
                  className=" p-2 rounded-xl linkHighlight text-white"
                  to="Settings"
                >
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hidden md:flex gap-4 justify-center items-center mr-1 text-xl mt-1">
          {user.username !== "" ? (
            <>
              <div className="border-2 cursor-pointer border-purple-900 p-2 rounded-xl text-white">
                <Link
                  className="linkHighlight flex items-center gap-2"
                  to={"/Settings"}
                >
                  {user.username} <CircleUserRound />
                </Link>
              </div>
              <div
                onClick={logoutUser}
                className="cursor-pointer border border-red-500 bg-red-900 p-2 
            rounded-xl text-white transition duration-500 ease-in-out hover:bg-red-800"
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div className="border-2 border-purple-900 p-2 rounded-xl text-white">
                <Link className="linkHighlight" to={"/Signup"}>
                  {" "}
                  <button>Sign Up</button>{" "}
                </Link>
              </div>
              <div className="border-2 border-purple-900 p-2 rounded-xl text-white">
                <Link className="linkHighlight" to={"/Login"}>
                  {" "}
                  <button>Sign In</button>{" "}
                </Link>
              </div>
            </>
          )}
          <div className="flex gap-2 justify-center items-center">
            <Switch
              onClick={changeTheme}
              className="border border-whites"
              checked={theme === "light"}
            />
            <div
              className="transition transform duration-500 ease-in-out"
              style={{
                transform: theme === "dark" ? "rotate(0deg)" : "rotate(360deg)",
              }}
            >
              {theme === "dark" ? (
                <Moon />
              ) : (
                <Sun className="text-yellow-500" />
              )}
            </div>
          </div>
        </div>

        <div className="flex md:hidden items-center mt-2">
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;

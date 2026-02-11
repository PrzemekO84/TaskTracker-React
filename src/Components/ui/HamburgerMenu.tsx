import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { CircleGauge, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { Switch } from "./switch"
import { Moon, Sun } from "lucide-react"
import { useThemeContext } from "@/context/ThemeContext"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"


export function HamburgerMenu() {
  const { theme, changeTheme } = useThemeContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-white" size={30} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-semibold text-purple-800 text-shadow-md/10 text-shadow-white">
              Voyager
            </h1>
            <CircleGauge className="mt-2" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 text-center gap-4 text-3xl">
            <div className="border-2 border-purple-900 p-4 rounded-md linkHighlight">
              <SheetClose asChild>
                <Link to="Signup">
                Sign Up
                </Link>
              </SheetClose>
            </div>
            <div className="border-2 border-purple-900 p-4 rounded-md linkHighlight">
              <SheetClose asChild>
                <Link to="/Login">Sign In</Link>
              </SheetClose>
            </div>
          </div>

          <nav className="grid grid-cols-1 text-center gap-4">
            <SheetClose asChild>
              <Link
                to="/"
                className="text-3xl border-2 p-4 rounded-md border-stone-800 divBorderHover"
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/Tasks"
                className="text-3xl border-2 p-4 rounded-md border-stone-800 divBorderHover"
              >
                Tasks
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                to="/Settings"
                className="text-3xl border-2 p-4 rounded-md border-stone-800 divBorderHover"
              >
                Settings
              </Link>
            </SheetClose>
          </nav>
          <div>
            <div className="flex gap-2 justify-center items-center text-3xl border-2 p-4 rounded-md border-stone-800 divBorderHover">
              <Switch onClick={changeTheme} size="default" />
              {theme === "light" ? <Sun /> : <Moon />}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

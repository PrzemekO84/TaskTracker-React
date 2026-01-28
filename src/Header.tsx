import { Button } from "./Components/ui/button";
import { Link } from "react-router-dom";
import { CircleGauge } from "lucide-react";

function Header() {
  return (
    <div className="border-b-2 border-stone-900 pb-6 shadow-md shadow-violet-300/20 bg-stone-900">
      <div className="flex justify-between items-center mt-5 mx-3 h-auto ">
        <div>
          <Link to="/" className="flex gap-4 justify-center items-center">
            <h1 className="text-4xl font-semibold text-purple-800 text-shadow-md/20 text-shadow-white">Voyager</h1>
            <CircleGauge className="mt-2" />
          </Link>
        </div>
        <div className="flex gap-5 justify-center items-center text-xl">
          <Link className="border border-violet-50 p-2 rounded-xl linkHighlight " to="/">
            Home
          </Link>
          <Link className="border border-violet-50 p-2 rounded-xl linkHighlight" to="/Tasks">
            Tasks
          </Link>
          <Link
            className="border border-violet-50 p-2 rounded-xl linkHighlight"
            to="Settings"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

import { Link } from "react-router-dom";
import { House } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { resetData } from "./utils/HelpFun";

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <div className="bg-stone-900 flex gap-4 p-4 w-full justify-center">
        <div className="text-white">
          <Link className="flex items-center gap-2 linkHighlight" to="/">
            Home <House />{" "}
          </Link>
        </div>
        <div className="text-white">
          <Link
            className="flex items-center gap-2 linkHighlight"
            to="https://github.com/PrzemekO84"
          >
            Github <GitHubIcon />{" "}
          </Link>
        </div>
        <div className="text-white">
          <Link
            className="linkHighlight flex items-center gap-2"
            to="https://www.linkedin.com/in/przemek-orzechowski/"
          >
            Linkedin <LinkedInIcon />{" "}
          </Link>
        </div>
        <div className="text-white">
          <Link
            className="flex items-center gap-2 linkHighlight"
            to="https://youtu.be/dQw4w9WgXcQ"
          >
            Youtube <YouTubeIcon />{" "}
          </Link>
        </div>
      </div>
      <div className="p-3 bg-black text-white">
        <p>&copy; Designed by Przemek Orzechowski</p>
      </div>
      <div
        onClick={resetData}
        className="mb-3 border-2 border-stone-800 p-1 rounded-md cursor-pointer text-white"
      >
        Reset App/Data
      </div>
    </div>
  );
}

export default Footer;

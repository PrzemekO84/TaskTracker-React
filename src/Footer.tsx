import { Link } from "react-router-dom";
import { House } from "lucide-react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer(){
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-stone-900 flex gap-4 p-4 w-full justify-center">
                <div className="flex gap-2 linkHighlight">
                    <Link to="/">Home</Link>
                    <Link to="/"> <House /> </Link>
                </div>
                <div className="flex gap-2 linkHighlight">
                    <Link to="https://github.com/PrzemekO84">Github</Link>
                    <Link to="https://github.com/PrzemekO84"> <GitHubIcon /> </Link>
                </div>
                <div className="flex gap-2 linkHighlight">
                    <Link to="https://www.linkedin.com/in/przemek-orzechowski/">Linkedin</Link>
                    <Link to="https://www.linkedin.com/in/przemek-orzechowski/"> <LinkedInIcon /> </Link>
                </div>
                <div className="flex gap-2 linkHighlight">
                    <Link to="https://youtu.be/dQw4w9WgXcQ">Youtube</Link>
                    <Link to="https://youtu.be/dQw4w9WgXcQ"> <YouTubeIcon /> </Link>
                </div>
            </div>
            <div className="p-3 bg-stone-950">
                <p>&copy; Designed by Przemek Orzechowski</p>
            </div>
        </div>
    )
}

export default Footer;
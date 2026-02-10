import { Input } from "@/Components/ui/input";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom";

function Signup(){
    return (
      <div className="w-screen flex justify-center items-center my-8">
        <div className="border-3 border-border rounded-md p-6 flex flex-col gap-4 justify-center">
          <h2 className="text-4xl text-center">Create an account</h2>
          <h3 className="text-xl text-muted-foreground">
            Enter your username, email and password to create a new account
          </h3>
          <form action="">
            <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Username
                </label>
                <Input placeholder="ILovePanckes123" className="p-5" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Email
                </label>
                <Input placeholder="MyEmail@gmail.com" className="p-5" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Password
                </label>
                <Input className="p-5" />
              </div>
              <button className="border-2 p-3 rounded-md bg-purple-950 text-xl hover:border-stone-300 hover:border-1 transition duration-500 ease-in-out">
                Create
              </button>
            </div>
          </form>
          <div className="flex items-center py-5">
            <div className="flex-grow border-t border"></div>

            <span className="mx-4 flex-shrink text-sm text-muted-foreground tracking-widest">
              OR CONTINUE WITH
            </span>

            <div className="flex-grow border-t border"></div>
          </div>
          <button className="border-2 p-3 rounded-md text-xl hover:border-stone-300 hover:border-1 transition duration-500 ease-in-out">
            <GitHubIcon className="mb-1" /> GitHub
          </button>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="underline decoration-solid" to="/Login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Signup;
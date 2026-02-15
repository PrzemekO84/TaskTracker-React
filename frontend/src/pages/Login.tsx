import { Input } from "@/Components/ui/input";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom";

function Login(){
    return (
      <div className="w-screen flex justify-center items-center my-8">
        <div className="border-3 border-border rounded-md p-6 flex flex-col gap-4 justify-center">
          <h2 className="text-4xl text-center">Login to your account</h2>
          <h3 className="text-xl text-muted-foreground">
            Enter your email and password to login into your account
          </h3>
          <form action="">
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Email
                </label>
                <Input placeholder="MyEmail@gmail.com" maxLength={30} min={5} className="p-5 border-black dark:border-border" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Password
                </label>
                <Input type="password" maxLength={30} min={5} className="p-5 border-black dark:border-border" />
              </div>
              <button className="border-2 p-3 text-white rounded-md bg-purple-950 text-xl hover:border-black dark:hover:border-stone-300 hover:border-1 transition duration-500 ease-in-out">
                Login
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
          <button className="border-2 p-3 rounded-md text-xl hover:border-black dark:hover:border-stone-300 transition duration-500 ease-in-out">
            <GitHubIcon className="mb-1" /> Login with GitHub
          </button>
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="underline decoration-solid" to="/Signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Login;
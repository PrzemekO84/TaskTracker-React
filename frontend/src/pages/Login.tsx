import { Input } from "@/Components/ui/input";
import { loginUserApi } from "@/Services/ApiService";
import type { ErrorMessage, LoginUser} from "@/Types/types";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/UserContext";

function Login(){
  const [loginCredentials, setloginCredentials] = useState<LoginUser>({
      email_username: "",
      password: "",
    });
  
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
      isError: false,
      message: "",
      status: null
    });

    const { loginUser } = useUserContext();
    const navigate = useNavigate();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const result = await loginUserApi(loginCredentials);
  
        if(result.status === 500 || result.status === 400){
          setloginCredentials(prevValues => {
            return {
              ...prevValues,
              password: ""
            }
          })
          setErrorMessage({
            isError: true,
            message: result.data.error,
            status: "error"
          })
        }
        else if(result.status === 201){
          loginUser({username: result.data.username, user_id: result.data.user_id, token: result.data.token})
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", result.data.username);
          localStorage.setItem("user_id", result.data.user_id);
          setErrorMessage({
            isError: true,
            message: result.data.message,
            status: "success"
          })
          setTimeout(() => {
            navigate("/")
          }, 2000)
        }
  
        setTimeout(() => {
          setErrorMessage({
            isError: false,
            message: "",
            status: null
          });
        }, 5000);
      } catch (error) {
        console.log("Error during submiting the data.");
        console.log(error);
      }
    };
  
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setloginCredentials((prevValues) => {
        return {
          ...prevValues,
          [name]: value
        };
      });
    };
    
    return (
      <div className="w-screen flex justify-center items-center my-8">
        <div className="border-3 border-border rounded-md p-6 flex flex-col gap-4 justify-center">
          <h2 className="text-4xl text-center">Login to your account</h2>
          <h3 className="text-xl text-muted-foreground text-center">
            Enter your email/username and password to login into your account
          </h3>
          <form onSubmit={handleLogin}>
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Email or Username
                </label>
                <Input
                  name="email_username"
                  onChange={changeInput}
                  value={loginCredentials.email_username}
                  placeholder="MyEmail@gmail.com | IlovePanckes123"
                  maxLength={30}
                  min={5}
                  className="p-5 border-black dark:border-border"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="">
                  Password
                </label>
                <Input
                  name="password"
                  onChange={changeInput}
                  value={loginCredentials.password}
                  type="password"
                  maxLength={30}
                  min={5}
                  className="p-5 border-black dark:border-border"
                />
              </div>
              <button
                type="submit"
                className="border-2 p-3 text-white rounded-md bg-purple-950 text-xl hover:border-black dark:hover:border-stone-300 hover:border-1 transition duration-500 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
          <p
            className={cn(
              "text-center mt-2 text-lg transition-all duration-300 ease-in-out",
              errorMessage.status === "success"
                ? "text-green-500"
                : "text-red-500",
              errorMessage.isError ? "block" : "hidden",
            )}
          >
            {errorMessage.message}
          </p>
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
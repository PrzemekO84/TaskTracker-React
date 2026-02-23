import { Input } from "@/Components/ui/input";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import type { RegisterUser } from "@/Types/types";
import { useState } from "react";
import { registerUserApi } from "@/Services/ApiService";
import type { ErrorMessage } from "@/Types/types";
import { cn } from "@/lib/utils";

function Signup() {
  const [registerCredentials, setRegisterCredentials] = useState<RegisterUser>({
    username: "",
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    isError: false,
    message: "",
    status: null
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await registerUserApi(registerCredentials);

      if(result.status === 500 || result.status === 400){
        setErrorMessage({
          isError: true,
          message: result.data.error,
          status: "error"
        })
      }
      else if(result.status === 201){
        setRegisterCredentials({
          username: "",
          email: "",
          password: ""
        });
        setErrorMessage({
          isError: true,
          message: result.data.message,
          status: "success"
        })
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
    setRegisterCredentials((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  };

  return (
    <div className="w-screen flex justify-center items-center my-8">
      <div className="border-3 border-border rounded-md p-6 flex flex-col gap-4 justify-center">
        <h2 className="text-4xl text-center">Create an account</h2>
        <h3 className="text-xl text-muted-foreground text-center">
          Enter your username, email and password to create a new account
        </h3>
        <form onSubmit={handleRegister} method="POST">
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-lg" htmlFor="">
                Username
              </label>
              <Input
                onChange={changeInput}
                value={registerCredentials.username}
                name="username"
                placeholder="ILovePanckes123"
                maxLength={30}
                min={5}
                className="p-5 border-black dark:border-border"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg" htmlFor="">
                Email
              </label>
              <Input
                onChange={changeInput}
                value={registerCredentials.email}
                name="email"
                placeholder="MyEmail@gmail.com"
                className="p-5 border-black dark:border-border"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg" htmlFor="">
                Password
              </label>
              <Input
                onChange={changeInput}
                name="password"
                value={registerCredentials.password}
                type="password"
                maxLength={30}
                min={5}
                className="p-5 border-black dark:border-border"
              />
            </div>
            <button
              type="submit"
              className="border-2 p-3 rounded-md text-white bg-purple-950 text-xl hover:border-black dark:hover:border-stone-300 transition duration-500 ease-in-out"
            >
              Create
            </button>
          </div>
        </form>
        <p
          className={cn(
            "text-center mt-2 text-lg transition-all duration-300 ease-in-out",
            errorMessage.status === "success"
              ? "text-green-500"
              : "text-red-500",
            errorMessage.isError ? "block" : "hidden"
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

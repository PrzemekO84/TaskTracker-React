import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"

type User = {
  username: string,
  user_id: string,
  token: string
}

type UserContextType = {
    user: User,
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({children} : {children: React.ReactNode}){
    const [user, setUser] = useState<User>({
        username: "",
        user_id: "",
        token: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const user_id = localStorage.getItem("user_id");
        if(token){
            try {
                const decodedToken = jwtDecode(token); 
                const currentTime = Date.now()/1000
                if(decodedToken.exp! < currentTime){
                    logoutUser();
                }
            } catch (error) {
                console.log(error);
                logoutUser();
            }
        }
        else{
            logoutUser();
        }
        if(token && username && user_id){
            setUser({
                username: username,
                user_id: user_id,
                token: token
            })
        }
    }, []);

    const loginUser = (user: User) => {
        setUser({
            username: user.username,
            user_id: user.user_id,
            token: user.token
        })
    }

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
        setUser({
            username: "",
            user_id: "",
            token: ""
        })
    }

    return (
        <userContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext(){
    const user = useContext(userContext);

    if(user === undefined){
        throw new Error("User context needs to be used within UserContext")
    }

    return user;
}

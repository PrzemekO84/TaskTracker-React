import { createContext, useContext, useEffect, useState } from "react";

type User = {
  username: string,
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
        token: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if(token && username){
            setUser({
                username: username,
                token: token
            })
        }
    }, []);

    const loginUser = (user: User) => {
        setUser({
            username: user.username,
            token: user.token
        })
    }

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser({
            username: "",
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

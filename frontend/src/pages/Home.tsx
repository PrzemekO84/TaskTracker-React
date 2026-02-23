import Name from "@/Components/HomeComponents/Name";
import Charts from "@/Components/HomeComponents/Charts";
import { useUserContext } from "@/context/UserContext";

function Home(){

    const { user } = useUserContext();

    console.log(user);
    return (
        <div className="flex flex-col items-center w-full mx-10 my-10">
            <Name />
            <Charts />
        </div>
    )
}

export default Home;
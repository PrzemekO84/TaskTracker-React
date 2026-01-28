import Name from "@/Components/HomeComponents/Name";
import Charts from "@/Components/HomeComponents/Charts";

function Home(){
    return (
        <div className="flex flex-col border-2 border-red-500 items-center w-full mx-10 my-10">
            <Name />
            <Charts />
        </div>
    )
}

export default Home;
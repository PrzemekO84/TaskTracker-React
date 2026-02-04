import { ChartBarDefault } from "@/Components/ui/BarChart";
import BestMonth from "./BestMonth";
import DailyProgress from "./DailyProgress";
import { useListTaskContext } from "@/context/ListTaskContext";

function Charts(){

    const {monthlyCount} = useListTaskContext();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 mt-15 border-2 2xl:grid-cols-3 border-purple-500 w-full gap-10 p-4">

            {Object.keys(monthlyCount).length > 0 && (
                <div>
                    <ChartBarDefault />
                </div>
            )}
            
            {Object.keys(monthlyCount).length > 0 && (
                <div >
                    <BestMonth />
                </div>
            )}
               
        
            <div>
                <DailyProgress />
            </div>
        </div>
    )
}

export default Charts;
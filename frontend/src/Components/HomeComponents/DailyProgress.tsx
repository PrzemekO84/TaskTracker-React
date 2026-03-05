import { Progress } from "../ui/progress";
import { ProgressWithLabel } from "../ui/ProgressWithLabel";
import { useListTaskContext } from "@/context/ListTaskContext";
import { Crown } from "lucide-react";



function DailyProgress(){
  const max = 5;

  const { taskDashboardData } = useListTaskContext();
  const dailyCount = taskDashboardData.dailyTaskData

  console.log("Co ty drukujesz?");

  console.log(dailyCount);

    return (
      <div className="flex flex-col items-center justify-between chartDiv divBorderHover text-3xl gap-20">
        <h1>Daily Progress </h1>
        <h2 className="flex items-center gap-2"><span className="text-purple-800 font-bold">{dailyCount}</span> {dailyCount > 1 ? "Tasks" : "Task"} Done {dailyCount >= max && <Crown className="text-yellow-400"/>}</h2>
        <ProgressWithLabel />
      </div>
    );
}

export default DailyProgress;


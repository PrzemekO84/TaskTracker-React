
import { Progress } from "../ui/progress";
import { ProgressWithLabel } from "../ui/ProgressWithLabel";



function DailyProgress(){
    return (
      <div className="flex flex-col items-center justify-between chartDiv divBorderHover text-3xl gap-20">
        <h1>Daily Progress</h1>
        <h2><span className="text-purple-800 font-bold">0</span> Tasks Done</h2>
        <ProgressWithLabel />
      </div>
    );
}

export default DailyProgress;


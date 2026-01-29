
import { Progress } from "../ui/progress";



function DailyProgress(){
    return (
      <div className="flex flex-col items-center justify-between chartDiv">
        <h1>Daily Progres</h1>
        <h2>0 Task Done</h2>
        <Progress value={5}/>
      </div>
    );
}

export default DailyProgress;


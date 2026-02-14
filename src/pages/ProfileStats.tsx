import { useListTaskContext } from "@/context/ListTaskContext";

function ProfileStats(){

    const { getTotalCompletedTaskLength, taskByPriorityCounter } = useListTaskContext();

    const totalTaskCount = getTotalCompletedTaskLength();
    
    console.log(taskByPriorityCounter);

    return (
      <div className="flex flex-col gap-2 justify-center">
      <h1 className="text-3xl lg:text-4xl py-3 text-center">
        Profile Settings
      </h1>
      <div className="flex flex-col">
        <h2>Total number of completed Tasks: {totalTaskCount}</h2>
        <h2>Total number of completed Critical Tasks: {taskByPriorityCounter.criticalTasks}</h2>
        <h2>Total number of completed High Tasks: {taskByPriorityCounter.highTasks}</h2>
        <h2>Total number of completed Medium Tasks: {taskByPriorityCounter.mediumTasks}</h2>
        <h2>Total number of completed Low Tasks: {taskByPriorityCounter.lowTasks}</h2>
      </div>
    </div>
    );
}

export default ProfileStats;
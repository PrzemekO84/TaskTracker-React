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
      <div className="flex flex-col gap-6 text-lg">
        <h2 className="border-2 p-3 rounded-md dark:border-border border-black mx-1">Total number of completed Tasks: <span className="text-purple-800 font-bold">{totalTaskCount}</span></h2>
        <h2 className="border-2 p-3 rounded-md dark:border-border border-black mx-1">Total number of completed <span className="text-red-700 font-bold">Critical</span> Tasks: <span className="text-purple-800 font-bold">{taskByPriorityCounter.criticalTasks}</span></h2>
        <h2 className="border-2 p-3 rounded-md dark:border-border border-black mx-1">Total number of completed <span className="text-amber-600 font-bold">High</span>Tasks: <span className="text-purple-800 font-bold">{taskByPriorityCounter.highTasks}</span></h2>
        <h2 className="border-2 p-3 rounded-md dark:border-border border-black mx-1">Total number of completed <span className="text-sky-600 font-bold">Medium</span> Tasks: <span className="text-purple-800 font-bold">{taskByPriorityCounter.mediumTasks}</span></h2>
        <h2 className="border-2 p-3 rounded-md dark:border-border border-black mx-1">Total number of completed <span className="text-green-700 font-bold">Low</span> Tasks: <span className="text-purple-800 font-bold">{taskByPriorityCounter.lowTasks}</span></h2>
      </div>
    </div>
    );
}

export default ProfileStats;
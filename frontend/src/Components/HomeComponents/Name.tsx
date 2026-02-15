import { useListTaskContext } from "@/context/ListTaskContext";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

function Name() {
  const { listInfo, getTotalTasksLength, getTasksLengthByPriority } = useListTaskContext();

  const tasksLength = getTotalTasksLength();
  const priorityTasksLength = getTasksLengthByPriority();

  const gridCounter = [
  listInfo.length > 0,
  tasksLength > 0,
  priorityTasksLength.criticalTasks > 0,
  priorityTasksLength.highTasks > 0,
].filter(Boolean).length;

console.log(gridCounter);


  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-6xl">Hello Przemek</h1>
      {listInfo.length > 0 ? (
        <>
          <h2 className="text-4xl">You have:</h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="nameTaskInfo buttonHighLight">
              <p>{listInfo.length} {listInfo.length > 1 ? "Lists" : "List"}</p>
            </div>
            {tasksLength > 0 && (
              <>
                <div className="nameTaskInfo buttonHighLight">
                  <p>{tasksLength} {tasksLength > 1 ? "Tasks" : "Task"}</p>
                </div>
              </>
            )}

            {priorityTasksLength.criticalTasks > 0 && (
              <>
                <div className="nameTaskInfo buttonHighLight">
                  <p>{priorityTasksLength.criticalTasks} Critical Priority {priorityTasksLength.criticalTasks > 1 ? "Tasks" : "Task"}</p>
                </div>
              </>
            )}

            {priorityTasksLength.highTasks > 0 && (
              <>
                <div className="nameTaskInfo buttonHighLight">
                  <p>{priorityTasksLength.highTasks} High Priority {priorityTasksLength.highTasks > 1 ? "Tasks" : "Task"}</p>
                </div>
              </>
            )}
          </div>
        </>
      ):
      (
        <>
          <h2 className="text-4xl">You have finished all your tasks!</h2>
        </>
      )}
    </div>
  );
}

export default Name;
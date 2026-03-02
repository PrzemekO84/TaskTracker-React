import { useListTaskContext } from "@/context/ListTaskContext";
import { useUserContext } from "@/context/UserContext";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

function Name() {
  const { listInfo, taskDashboardData } = useListTaskContext();
  const { user } = useUserContext();

  const priorityTaskCounter = taskDashboardData.undoneTaskData
  let totalTaskCounter = 0;
  Object.values(taskDashboardData.undoneTaskData).forEach((value) => {
    totalTaskCounter += value;
  }) 

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-12">
        {user.username === "" ? (
          <>
            <h1 className="text-6xl font-semibold text-center mt-15">
              Welcome to the{" "}
              <span className="text-purple-700 font-bold text-shadow-md text-shadow-purple-500/50 dark:text-shadow-purple-500/60">
                Task Voyager
              </span>
            </h1>
            <h2 className="text-4xl font-semibold text-center">
              Your own{" "}
              <span className="text-purple-700 font-bold text-4xl text-shadow-md text-shadow-purple-500/50 dark:text-shadow-purple-500/50">
                private manager
              </span>{" "}
              to help you track your tasks
            </h2>
            <h3 className="text-3xl font-semibold text-center">
              Please start by creating your{" "}
              <span className="text-purple-700 font-bold text-4xl text-shadow-md text-shadow-purple-500/50 dark:text-shadow-purple-500/50">
                account
              </span>
            </h3>
            <Link to="/Signup">
              <button className="text-4xl text-white button p-4 buttonHighLight w-fit">
                Create account
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-6xl font-semibold text-center">
              Hello{" "}
              <span className="text-purple-700 font-bold text-shadow-md text-shadow-purple-500/50 dark:text-shadow-purple-500/60">
                {user.username}
              </span>
            </h1>
            {listInfo.length > 0 ? (
              <>
                <h2 className="text-4xl">You have:</h2>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="nameTaskInfo buttonHighLight">
                    <p>
                      {listInfo.length} {listInfo.length > 1 ? "Lists" : "List"}
                    </p>
                  </div>
                  {totalTaskCounter > 0 && (
                    <>
                      <div className="nameTaskInfo buttonHighLight">
                        <p>
                          {totalTaskCounter}{" "}
                          {totalTaskCounter > 1 ? "Tasks" : "Task"}
                        </p>
                      </div>
                    </>
                  )}

                  {priorityTaskCounter.criticalTasks > 0 && (
                    <>
                      <div className="nameTaskInfo buttonHighLight">
                        <p>
                          {priorityTaskCounter.criticalTasks} Critical Priority{" "}
                          {priorityTaskCounter.criticalTasks > 1
                            ? "Tasks"
                            : "Task"}
                        </p>
                      </div>
                    </>
                  )}

                  {priorityTaskCounter.highTasks > 0 && (
                    <>
                      <div className="nameTaskInfo buttonHighLight">
                        <p>
                          {priorityTaskCounter.highTasks} High Priority{" "}
                          {priorityTaskCounter.highTasks > 1 ? "Tasks" : "Task"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl">You have finished all your tasks!</h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Name;

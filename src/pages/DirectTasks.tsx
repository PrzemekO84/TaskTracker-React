import { useListTaskContext } from "@/context/ListTaskContext";
import { useEffect, useMemo, useState } from "react";
import type { List, SortType } from "@/Types/types";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import TaskWindow from "@/Components/DirectTasksComponents.tsx/TaksWindow";
import SingleTask from "@/Components/DirectTasksComponents.tsx/SingleTask";
import CreateListWindow from "@/Components/TasksComponents/CreateList";
import { toUpperCase } from "@/utils/HelpFun";
import SortByHoverTasks from "@/Components/ui/SortByHover";
import { sortCreatedTasks, sortDeadlineTasks, sortPriorityTasks } from "@/utils/SortingFuncs";

function DirectTasks() {
    const { listId } = useParams<{listId : string}>();
    const { listInfo, deleteListItem } = useListTaskContext();
    const [newTaskWindow, setNewTaskWindow] = useState(false);
    const [editListWindow, setEditListWindow] = useState(false);
    const [sortType, setSortType] = useState<SortType>("default");
    const navigate = useNavigate();

    const handleNewTaskWindow = () => setNewTaskWindow(!newTaskWindow);
    const handleEditTaskWindow = () => setEditListWindow(!editListWindow);

    const currentList = listInfo.find(list => list.id === listId);

    if(!currentList){
        return <NotFound />
    }

    const tasks = currentList.tasks;
    
        const sortedData = useMemo(() => {
          switch(sortType){
            case "createdNewest": return sortCreatedTasks(tasks, "Newest")
            case "createdOldest": return sortCreatedTasks(tasks, "Oldest")
            case "priorityHighest": return sortPriorityTasks(tasks, "Highest")
            case "priorityLowest": return sortPriorityTasks(tasks, "Lowest")
            case "deadlineSoonest": return sortDeadlineTasks(tasks, "Soonest")
            case "deadlineLatest": return sortDeadlineTasks(tasks, "Latest")
            case "default": return tasks
          }
        }, [listInfo, sortType])

     const initialListInfo: List = {
        id: currentList.id,
        name: currentList.name,
        priority: currentList.priority,
        created: currentList.created,
        until: currentList.until,
        time: currentList.time,
        tasks: currentList.tasks
      };

    useEffect(() => {
      if (newTaskWindow === true) {
        const closeListWindow = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleNewTaskWindow();
          }
        };

        window.addEventListener("keydown", closeListWindow);

        return () => {
          window.removeEventListener("keydown", closeListWindow);
        };
      }
    }, [newTaskWindow]);

    return (
      <div className="flex flex-col w-screen mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 border-3 rounded-md border-purple-950/80 mt-5 p-5">
          <div></div>
          <h1 className="text-center text-5xl break-words">
            {toUpperCase(currentList.name)}
          </h1>
          <div className="flex justify-center md:justify-end mt-5 md:mt-0">
            <SortByHoverTasks sort={setSortType}/>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-5 xl:gap-8">
          <button
            onClick={handleNewTaskWindow}
            className="p-4 text-xl xl:text-2xl button buttonHighLight"
          >
            Add Task
          </button>
          <button
            className="p-4 text-xl xl:text-2xl button buttonHighLight bg-sky-700"
            onClick={handleEditTaskWindow}
          >
            Edit List
          </button>
          <button
            className="p-4 text-xl xl:text-2xl button buttonHighLight bg-red-900"
            onClick={() => {
              if (listId) {
                deleteListItem(listId);
                navigate("/Tasks");
              }
            }}
          >
            Delete List
          </button>
        </div>
        <div className="flex flex-col p-2">
          {sortedData.map((task, index) => {
                return (
                  <SingleTask
                    key={task.id}
                    id={index + 1}
                    taskId={task.id}
                    name={task.name}
                    priority={task.priority}
                    created={task.created}
                    until={task.until}
                    time={task.time}
                    completed={task.completed}
                    listId={listId!}
                  />
                );
              })}
        </div>

        {newTaskWindow && (
          <TaskWindow
            onClose={handleNewTaskWindow}
            listId={listId!}
            type={"new"}
          />
        )}

        {editListWindow && (
          <CreateListWindow
            onClose={handleEditTaskWindow}
            type={"edit"}
            initialData={initialListInfo}
          />
        )}
      </div>
    );
}

export default DirectTasks;
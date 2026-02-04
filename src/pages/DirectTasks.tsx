import { useListTaskContext } from "@/context/ListTaskContext";
import { useContext, useEffect, useState } from "react";
import type { List } from "@/Types/types";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import TaskWindow from "@/Components/DirectTasksComponents.tsx/TaksWindow";
import SingleTask from "@/Components/DirectTasksComponents.tsx/SingleTask";
import CreateListWindow from "@/Components/TasksComponents/CreateList";
import { toUpperCase } from "@/utils/HelpFun";

function DirectTasks() {
    const { listId } = useParams<{listId : string}>();
    const { listInfo, deleteListItem } = useListTaskContext();
    const [newTaskWindow, setNewTaskWindow] = useState(false);
    const [editListWindow, setEditListWindow] = useState(false);
    const navigate = useNavigate();

    const handleNewTaskWindow = () => setNewTaskWindow(!newTaskWindow);
    const handleEditTaskWindow = () => setEditListWindow(!editListWindow);

    const currentList = listInfo.find((list) => {
        return list.id === listId;
    })

    if(!currentList){
        return <NotFound />
    }

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
        <h1 className="text-center text-5xl bg-stone-900 border-3 rounded-md border-purple-900 mt-5 p-5">
          {toUpperCase(currentList.name)}
        </h1>
        <div className="flex gap-4 justify-center mt-5 xl:gap-8">
          <button
            onClick={handleNewTaskWindow}
            className="p-4 text-xl xl:text-2xl button buttonHighLight"
          >
            Add Task
          </button>
          <button className="p-4 text-xl xl:text-2xl button buttonHighLight bg-sky-700"
            onClick={handleEditTaskWindow}
          >
            Edit List
          </button>
          <button className="p-4 text-xl xl:text-2xl button buttonHighLight bg-red-900"
            onClick={() => {
              if(listId){
                deleteListItem(listId)
                navigate("/Tasks")
              }
            }}
          >
            Delete List
          </button>
        </div>
        <div className="flex flex-col ">
          {listInfo.map((list) => {
            if (list.id === listId) {
              return list.tasks.map((task, index) => {
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
                    listId={listId}
                  />
                );
              });
            }
          })}
        </div>

        {newTaskWindow && (
          <TaskWindow onClose={handleNewTaskWindow} listId={listId!} type={"new"}/>
        )}

        {editListWindow && (
          <CreateListWindow onClose={handleEditTaskWindow } type={"edit"} initialData={initialListInfo}/>
        )}
      </div>
    );
}

export default DirectTasks;
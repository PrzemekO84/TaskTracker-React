import { useListTaskContext } from "@/context/ListTaskContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import NewTaskWindow from "@/Components/DirectTasksComponents.tsx/NewTaskWindow";
import SingleTask from "@/Components/DirectTasksComponents.tsx/SingleTask";

function DirectTasks() {
    const { listId } = useParams<{listId : string}>();
    const { listInfo } = useListTaskContext();
    const [newTaskWindow, setNewTaskWindow] = useState(false);

    const handleSetNewTaskWindow = () => setNewTaskWindow(!newTaskWindow)

    const currentList = listInfo.find((list) => {
        return list.id === listId;
    })

    if(!currentList){
        return <NotFound />
    }

    useEffect(() => {
      if (newTaskWindow === true) {
        const closeListWindow = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleSetNewTaskWindow();
          }
        };

        window.addEventListener("keydown", closeListWindow);

        return () => {
          window.removeEventListener("keydown", closeListWindow);
        };
      }
    }, [newTaskWindow]);

    console.log(listInfo);

    return (
      <div className="flex flex-col border-2 border-red-500 w-screen">
        <h1 className="text-center text-4xl border-3 rounded-md border-stone-600 p-5">
          Hello {currentList.name}
        </h1>
        <div className="flex gap-4 justify-center mt-5 xl:gap-8">
          <button
            onClick={handleSetNewTaskWindow}
            className="p-4 text-xl xl:text-2xl button buttonHighLight"
          >
            Add Task
          </button>
          <button className="p-4 text-xl xl:text-2xl button buttonHighLight">
            Edit List
          </button>
          <button className="p-4 text-xl xl:text-2xl button buttonHighLight">
            Delete List
          </button>
        </div>
        <div>
          {listInfo.map((list) => {
            if (list.id === listId) {
              return list.tasks.map((task, index) => {
                return (
                  <SingleTask
                    key={task.id}
                    id={index + 1}
                    name={task.name}
                    priority={task.priority}
                    created={task.created}
                    until={task.until}
                    time={task.time}
                    completed={task.completed}
                  />
                );
              });
            }
          })}
        </div>

        {newTaskWindow && (
          <NewTaskWindow onClose={handleSetNewTaskWindow} listId={listId!} />
        )}
      </div>
    );
}

export default DirectTasks;
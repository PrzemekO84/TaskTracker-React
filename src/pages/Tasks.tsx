import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateListWindow from "@/Components/TasksComponents/CreateList";
import { useListTaskContext } from "@/context/ListTaskContext";
import ListName from "@/Components/TasksComponents/ListName";
import ListBox from "@/Components/TasksComponents/ListBox";
import { ChevronDown } from "lucide-react";

function Tasks(){
    const [createListWindow, setCreateListWindow] = useState(false);
    const { listInfo } = useListTaskContext();

    function handleCreateWindow(){
        setCreateListWindow(!createListWindow);
    }

    useEffect(() => {
      if (createListWindow === true) {
        const closeListWindow = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleCreateWindow();
          }
        };

        window.addEventListener("keydown", closeListWindow);

        return () => {
          window.removeEventListener("keydown", closeListWindow);
        };
      }
    }, [createListWindow]);

    return (
      <div className="w-screen m-5 flex">
        <div className="border-2 border-stone-800 rounded-md p-2 w-[30%] flex flex-col">
          <div className="border-2 border-stone-700 h-auto p-5 rounded-md flex flex-col gap-4 md:flex-row items-center justify-between mb-2">
            <button
              onClick={handleCreateWindow}
              className="text-2xl xl:text-3xl button buttonHighLight text-center"
            >
              Create New List
            </button>
            <div>
              <button className="text-xl lg:text-2xl border-stone-600 border-2 p-3 rounded-md flex items-center gap-2">Sort Lists <ChevronDown className="mt-1" /></button>
            </div>
          </div>
          <div className="h-full flex flex-col items-center gap-4">
            {listInfo.map((list) => {
              return (
                <Link key={list.id} to={`/DirectTasks/${list.id}`} className="w-full">
                  <ListName title={list.name} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="border-2 border-stone-800 rounded-md p-3 w-[70%] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 auto-rows-[350px]">
          {listInfo.map((list) => {
            return (
              <Link key={list.id} to={`/DirectTasks/${list.id}`}>
                <ListBox
                  name={list.name}
                  priority={list.priority}
                  created={list.created}
                  until={list.until}
                  time={list.time}
                  tasksLength={list.tasks.length}
                />
              </Link>
            );
          })}
        </div>

        {createListWindow && (
          <CreateListWindow onClose={handleCreateWindow} type="new" />
        )}
      </div>
    );
}

export default Tasks;
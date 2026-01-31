import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ListTask } from "@/Types/types";
import CreateListWindow from "@/Components/TasksComponents/ListWindow";
import { useListTaskContext } from "@/context/ListTaskContext";
import ListName from "@/Components/TasksComponents/ListName";
import ListBox from "@/Components/TasksComponents/ListBox";

function Tasks(){
    const [createListWindow, setCreateListWindow] = useState(false);
    const { info } = useListTaskContext();

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
    });

    return (
      <div className="border-2 border-red-500 w-screen m-5 flex gap-7">
        <div className="border-2 border-blue-500 w-[30%] flex flex-col">
          <div className="border-2 border-pink-500 h-auto p-5 flex justify-center">
            <button
              onClick={handleCreateWindow}
              className="text-2xl xl:text-3xl button buttonHighLight text-center"
            >
              Create New List
            </button>
          </div>
          <div className="border-2 border-yellow-400 h-full flex flex-col items-center gap-3">
            {info.map((list) => {
              return <ListName title={list.name}/>
            })}
          </div>
        </div>
        <div className="border-2 border-green-500 w-[70%] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 auto-rows-[350px]">
          {info.map((list) => {
            return <ListBox name={list.name} priority={list.priority} created={list.created} until={list.until} time={list.time}/>
          })}
          <div className=" border-2"></div>
          <div className=" border-2"></div>
          <div className=" border-2"></div>
          <div className=" border-2"></div>
        </div>

        {createListWindow && (
          <CreateListWindow onClose={handleCreateWindow} />
        )}
      </div>
    );
}

export default Tasks;
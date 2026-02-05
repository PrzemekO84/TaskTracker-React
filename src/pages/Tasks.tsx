import { useEffect, useMemo, useState } from "react";
import type { SortType } from "@/Types/types";
import { Link, useParams } from "react-router-dom";
import CreateListWindow from "@/Components/TasksComponents/CreateList";
import { useListTaskContext } from "@/context/ListTaskContext";
import ListName from "@/Components/TasksComponents/ListName";
import ListBox from "@/Components/TasksComponents/ListBox";
import SortByHover from "@/Components/ui/SortByHover";
import { sortCreatedList, sortDeadlineList, sortPriorityList } from "@/utils/SortingFuncs";


function Tasks(){
    const [createListWindow, setCreateListWindow] = useState(false);
    const { listInfo } = useListTaskContext();
    const { listId } = useParams<string>();
    const [sortType, setSortType] = useState<SortType>("default");

    function handleCreateWindow(){
        setCreateListWindow(!createListWindow);
    }

    //const currentList = listInfo.find(list => list.id === listId);

    const sortedData = useMemo(() => {
      switch(sortType){
        case "createdNewest": return sortCreatedList(listInfo, "Newest")
        case "createdOldest": return sortCreatedList(listInfo, "Oldest")
        case "priorityHighest": return sortPriorityList(listInfo, "Highest")
        case "priorityLowest": return sortPriorityList(listInfo, "Lowest")
        case "deadlineSoonest": return sortDeadlineList(listInfo, "Soonest")
        case "deadlineLatest": return sortDeadlineList(listInfo, "Latest")
        case "default": return listInfo
      }
    }, [listInfo, sortType])

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
            <div className="text-xl lg:text-2xl border-stone-600 border-2 p-3 rounded-md flex items-center gap-2">
                <SortByHover sort={setSortType}/>
            </div>
          </div>
          <div className="h-full flex flex-col items-center gap-4">
            {sortedData.map((list) => {
              return (
                <Link key={list.id} to={`/DirectTasks/${list.id}`} className="w-full">
                  <ListName title={list.name} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="border-2 border-stone-800 rounded-md p-3 w-[70%] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 auto-rows-[350px]">
          {sortedData.map((list) => {
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
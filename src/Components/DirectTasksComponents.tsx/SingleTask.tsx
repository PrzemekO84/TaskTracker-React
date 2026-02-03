import type { Task, RenderedTask } from "@/Types/types";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { useListTaskContext } from "@/context/ListTaskContext";
import TaskWindow from "./TaksWindow";
import { useState } from "react";
import { Check } from "lucide-react";
import { priorityColor } from "@/utils/HelpFun";
import { createdDateFormat } from "@/utils/HelpFun";


function SingleTask({
  id,
  taskId,
  name,
  priority,
  created,
  until,
  time,
  completed,
  listId,
}: RenderedTask) {
  const { deleteTaskItem, editTaskItem } = useListTaskContext();
  const [newEditTaskWindow, setNewEditTaskWindow] = useState(false);
  const [done, isDone] = useState(false);

  const deleteDelay = (ms: number) => new Promise(res => setTimeout(res, ms))

  const handleIsDone = async () => {
    await deleteDelay(4000);
    console.log("xd");
  };

  function handleIsDonex(){
    isDone(!done)
  }

  const initialTaskInfo: Task = {
    id: taskId,
    name: name,
    priority: priority,
    created: createdDateFormat(),
    until: until,
    time: time,
    completed: completed,
  };

  const handleEditTaskWindow = () => setNewEditTaskWindow(!newEditTaskWindow);
  return (
    <div
      className={`grid grid-cols-1 min-[900px]:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 border-4 rounded-2xl p-6
       border-purple-900 text-center text-lg bg-stone-900 mt-5 ${done ? 'transistion duration-600 ease-in bg-purple-900/40 line-through opacity-60' : 'bg-stone-900'}`}
    >
      <h1 className="border border-purple-900  rounded-full bg-purple-800">
        {id}
      </h1>
      <h1>{name}</h1>
      <h1 className={`${priorityColor(priority)}`}>Priority: {priority}</h1>
      <h1>Created: {createdDateFormat()}</h1>
      <h1>Day Deadline: {until}</h1>
      <h1>Time Deadline: {time}</h1>
      <div className="flex gap-3 items-center justify-center mr-2">
        <div
          onClick={() => {
            handleEditTaskWindow();
            //editTaskItem();
          }}
          className="flex gap-2 items-center border-1 border-sky-500 bg-sky-700 p-1 rounded-md font-semibold cursor-pointer buttonHighLight"
        >
          <button>Edit </button>
          <Pencil size={18} />
        </div>
        <div
          onClick={() => {
            deleteTaskItem(listId, taskId);
          }}
          className="flex gap-2 items-center border-1 border-red-500 bg-red-900 p-1 rounded-md font-semibold cursor-pointer buttonHighLight"
        >
          <button>Delete </button>
          <Trash size={18} />
        </div>
        <div

        //tutaj jest syf lekki
          onClick={async () => {
            console.log(done);
            isDone(true);
            handleIsDonex();
            console.log(done);
            await handleIsDone();
            if(done === true){
              deleteTaskItem(listId, taskId);
            }
          }}
          className="flex gap-2 items-center border-1 border-green-500 bg-green-800 p-1 rounded-md font-semibold cursor-pointer buttonHighLight"
            
        >
          <button>Done </button>
          <Check size={18}/>
        </div>
      </div>

      {newEditTaskWindow && (
        <TaskWindow
          onClose={handleEditTaskWindow}
          listId={listId}
          type={"edit"}
          initialData={initialTaskInfo}
        />
      )}
    </div>
  );
}

export default SingleTask;

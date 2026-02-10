import type { Task, RenderedTask } from "@/Types/types";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { useListTaskContext } from "@/context/ListTaskContext";
import TaskWindow from "./TaksWindow";
import { useState } from "react";
import { Check } from "lucide-react";
import { priorityColor } from "@/utils/HelpFun";
import { createdDateFormat, dayDeadlineFormat } from "@/utils/HelpFun";


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
  const { deleteTaskItem, setDailyCounter, setMonthlyCounter } = useListTaskContext();
  const [newEditTaskWindow, setNewEditTaskWindow] = useState(false);
  const [done, isDone] = useState(false);

  const deleteDelay = (ms: number) => new Promise(res => setTimeout(res, ms))

  const handleIsDone = async () => {
    isDone(!done)
    await deleteDelay(3000);
    console.log("xd");
  };

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
      text-center border-purple-950/80 text-lg mt-5 ${done ? "transistion duration-600 ease-in bg-stone-900/20 line-through opacity-60" : "bg-background"}`}
    >
      <h1 className="border border-purple-900  rounded-full bg-purple-950">
        {id}
      </h1>
      <h1>{name}</h1>
      <h1 className={`${priorityColor(priority)}`}>Priority: {priority}</h1>
      <h1>Created: {createdDateFormat()}</h1>
      <h1>Day Deadline: {dayDeadlineFormat(until)}</h1>
      <h1>Time Deadline: {time.slice(0, 5)}</h1>
      <div className="flex gap-3 items-center justify-center mr-2">
        <div>
          <button
            className={`flex gap-2 items-center border border-sky-500 bg-sky-700 p-1 
          rounded-md font-semibold buttonHighLight ${done ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={done}
            onClick={() => {
              handleEditTaskWindow();
            }}
          >
            Edit <Pencil size={18} />
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 items-center border border-red-500 bg-red-900 p-1 
          rounded-md font-semibold buttonHighLight ${done ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={done}
            onClick={() => {
              deleteTaskItem(listId, taskId);
            }}
          >
            Delete <Trash size={18} />
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 items-center border border-green-500 bg-green-800 p-1 
          rounded-md font-semibold buttonHighLight ${done ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={done}
            onClick={async () => {
              setDailyCounter();
              setMonthlyCounter();
              await handleIsDone();
              deleteTaskItem(listId, taskId);
            }}
          >
            Done <Check size={18} />
          </button>
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

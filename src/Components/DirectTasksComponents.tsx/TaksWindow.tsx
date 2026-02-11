import { useListTaskContext } from "@/context/ListTaskContext";
import { useEffect, useState } from "react";
import type { Priority } from "@/Types/types";
import DropDownMenuList from "../ui/DropDownMenuList";
import DatePicker from "../ui/DatePicker";
import TimePicker from "../ui/TimePicker";
import type { RenderedTask, Task } from "@/Types/types";

type PropsElements = {
  onClose: () => void;
  listId: string
  type: string
  initialData?: Task;
};

function TaskWindow({ onClose, listId, type, initialData }: PropsElements) {
  const { addTaskItem, editTaskItem } = useListTaskContext();
  const [taskName, setTaskName] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>("Low");
  const [dayDeadline, setDayDeadline] = useState<Date | undefined>(undefined);
  const [timeDeadline, setTimeDeadline] = useState<Date | undefined>(undefined);
  const createdDate = new Date().toDateString();

  const handleSelectPriority = (priority: Priority) => setSelectedPriority(priority);

  useEffect(() => {
    if(type === "edit" && initialData){
      setTaskName(initialData.name)
      setSelectedPriority(initialData.priority)
      if(initialData.until !=="None"){
        setDayDeadline(new Date(initialData.until))
      }
      if(initialData.time !== "None"){
        const [ hours, minutes ] = initialData.time.split(":").map(Number);
        const newHour = new Date()
        newHour.setHours(hours, minutes, 0, 0);
        setTimeDeadline(newHour);
      }
    }
  }, [type, initialData]);

  function finalDay() {
    if (!dayDeadline) return "None";
    return dayDeadline.toDateString();
  }
   
  function finalTime() {
    if (!timeDeadline) return "None";
    return timeDeadline.toTimeString();
  }

  function handleSubmit() {
    const TaskItem = {
      id: type === "new" ? crypto.randomUUID() : initialData!.id,
      name: taskName,
      priority: selectedPriority,
      created: type === "new" ? createdDate : initialData!.created,
      until: finalDay(),
      time: finalTime(),
      completed: false,
    };
    if (type === "new") {
      addTaskItem(listId, TaskItem);
    } else {
      editTaskItem(listId, initialData!.id, TaskItem);
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.requestSubmit();
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          onClose();
        }}
        action=""
      >
        <div className="relative bg-background border-2 rounded-xl p-6 w-[400px] z-10 lg:w-[600px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl text-purple-800 font-bold text-center">
              {type === "new" ? "Create New Task" : "Edit Task"}
            </h2>

            <input
              value={taskName}
              onChange={(event) => {
                setTaskName(event.target.value);
              }}
              required={true}
              maxLength={40}
              type="text"
              placeholder="Task name"
              className="w-full p-2 rounded-md dark:bg-stone-900 dark:hover:border-purple-950 hover:border-black text-center border-2"
            />

            <DropDownMenuList
              selectedPriority={selectedPriority}
              handleSelectPriority={handleSelectPriority}
            />

            <div>
              <DatePicker
                value={dayDeadline}
                onChange={(value) => {
                  setDayDeadline(value);
                }}
              ></DatePicker>
            </div>

            <TimePicker value={timeDeadline} onChange={setTimeDeadline} />

            <div className="flex justify-end gap-3">
              <button
                type={"button"}
                onClick={onClose}
                className="px-4 py-2 rounded bg-white dark:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type={"submit"}
                className="px-4 py-2 rounded bg-purple-900 hover:border-1 divBorderHover text-white"
              >
                {type === "new" ? "Create" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskWindow;

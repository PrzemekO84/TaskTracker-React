import { useContext, useEffect, useState } from "react";
import type { List, Priority } from "@/Types/types";
import DatePicker from "../ui/DatePicker";
import DropDownMenuList from "../ui/DropDownMenuList";
import { useListTaskContext } from "@/context/ListTaskContext";
import TimePicker from "../ui/TimePicker";
import { createdDateFormat } from "@/utils/HelpFun";
import { useNavigate, useParams } from "react-router-dom";
import { addList, editList } from "@/Services/ApiService";
import { useUserContext } from "@/context/UserContext";

type PropsElements = {
  onClose: () => void;
  type: string;
  initialData?: List;
}

function CreateListWindow({onClose, type, initialData} : PropsElements) {

  const [listName, setListName] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>("Low");
  const [dayDeadline, setDayDeadline] = useState<Date | undefined>(undefined);
  const [timeDeadline, setTimeDeadline] = useState<Date | undefined>(undefined);
  const createdDate = new Date().toDateString();
  //const { addListItem, editListItem } = useListTaskContext();
  const { user }  = useUserContext();
  const { listId }  = useParams<{listId: string}>();
  const navigate = useNavigate();

  useEffect(() => {
      if(type === "edit" && initialData){
        setListName(initialData.name)
        setSelectedPriority(initialData.priority)
        if(initialData.until !==null){
          setDayDeadline(new Date(initialData.until))
        }
        if(initialData.time !== null){
          const [ hours, minutes ] = initialData.time.split(":").map(Number);
          const newHour = new Date()
          newHour.setHours(hours, minutes, 0, 0);
          setTimeDeadline(newHour);
        }
      }
    }, [type, initialData]);

  function handleSelectPriority(priority: Priority) {
    setSelectedPriority(priority);
  }

  function finalDay() {
    if (!dayDeadline) return null;
    return dayDeadline.toDateString();
  }

  function finalTime() {
    if (!timeDeadline) return null;
    return timeDeadline.toTimeString().slice(0, 8);
  }

  function handleSubmit() {
    const listItem = {
      list_id: type === "new" ? "6" : (initialData!.list_id || ""),
      name: listName,
      priority: selectedPriority,
      created_at: type === "new" ? createdDate : (initialData!.created_at || ""),
      until: finalDay(),
      time: finalTime(),
      tasksLength: "0",
    }
    if (type === "new") {
      addList(listItem);
    }
    else if (type === "edit") {
      if (listId) {
        editList(listItem, listId)
      }
    }

    console.log(listItem);
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <form
        onKeyDown={(e) =>{
          if(e.key === "Enter"){
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
              {type === "new" ? "Create New List" : "Edit List"}
            </h2>

            <input
              value={listName}
              onChange={(event) => {
                setListName(event.target.value);
              }}
              required={true}
              maxLength={25}
              type="text"
              placeholder="List name"
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
                className="px-4 py-2 rounded text-white bg-purple-900 hover:border-1 divBorderHover"
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

export default CreateListWindow;

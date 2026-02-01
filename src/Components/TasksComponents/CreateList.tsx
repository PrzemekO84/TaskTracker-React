import { useContext, useState } from "react";
import type { Priority } from "@/Types/types";
import { Button } from "@/Components/ui/button";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import DropDownMenuList from "../ui/DropDownMenuList";
import { useListTaskContext } from "@/context/ListTaskContext";
import TimePicker from "../ui/TimePicker";

function CreateListWindow({ onClose }: { onClose: () => void }) {
  const [listName, setListName] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>("");
  const [dayDeadline, setDayDeadline] = useState<Date | undefined>(undefined);
  const [timeDeadline, setTimeDeadline] = useState<Date | undefined>(undefined);
  const createdDate = new Date().toDateString();
  const { addListItem } = useListTaskContext();

  function handleSelectPriority(priority: Priority) {
    setSelectedPriority(priority);
  }


  function finalDay() {

    if (!dayDeadline) return "None";
    return dayDeadline.toDateString();
  }

  function finalTime() {

    if (!timeDeadline) return "None";
    return timeDeadline.toTimeString().slice(0, 5);
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addListItem({
            id: crypto.randomUUID(),
            name: listName,
            priority: selectedPriority,
            created: createdDate,
            until: finalDay(),
            time: finalTime(),
            tasks: []
          });
          onClose();
        }}
        action=""
      >
        <div className="relative bg-stone-900 rounded-xl p-6 w-[400px] z-10 lg:w-[600px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl text-purple-800 font-bold text-center">
              Create New List
            </h2>

            <input
              value={listName}
              onChange={(event) => {
                setListName(event.target.value);
              }}
              required={true}
              maxLength={40}
              type="text"
              placeholder="List name"
              className="w-full p-2 rounded bg-stone-800 text-center border border-stone-500"
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
                onClick={onClose}
                className="px-4 py-2 rounded bg-stone-700"
              >
                Cancel
              </button>
              <button
                type={"submit"}
                className="px-4 py-2 rounded bg-purple-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListWindow;

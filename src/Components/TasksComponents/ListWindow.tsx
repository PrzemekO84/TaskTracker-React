import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import type { Priority } from "@/Types/types";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/Components/ui/dropdown-menu";
import DatePicker from "../ui/DatePicker";

function CreateListWindow({ onClose }: { onClose: () => void }) {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [deadline, setDeadline] = useState<Date | undefined>()
  const createdDate = new Date().toDateString();

  function handleSelectPriority(priority: Priority) {
    setSelectedPriority(priority);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <form action="">
        <div className="relative bg-stone-900 rounded-xl p-6 w-[400px] z-10 lg:w-[600px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl text-purple-800 font-bold text-center">
              Create new list
            </h2>

            <input
              required
              type="text"
              placeholder="List name"
              className="w-full p-2 rounded bg-stone-800 text-center border border-stone-500"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full bg-stone-800 hover:bg-stone-950 p-5 border border-stone-500 rounded">
                  {selectedPriority
                    ? "Priority: " +
                      selectedPriority.charAt(0).toUpperCase() +
                      selectedPriority?.slice(1)
                    : "Select priority"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full">
                <DropdownMenuRadioGroup
                  value={selectedPriority ?? ""}
                  onValueChange={(value) => {
                    handleSelectPriority(value as Priority);
                  }}
                >
                  <DropdownMenuRadioItem className="variant" value="critical">
                    Critical
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="high">
                    High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="medium">
                    Medium
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div>
              <DatePicker value={deadline} onChange={(value) => {
                setDeadline(value)
              }}>
              </DatePicker>
            </div>

            {/* ACTIONS */}
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

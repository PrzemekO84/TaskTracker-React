import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/Components/ui/dropdown-menu";
import type { Priority } from "@/Types/types";

type PropsElements = {
    selectedPriority: Priority,
    handleSelectPriority: (priority: Priority) => void;

}

function DropDownMenuList({selectedPriority, handleSelectPriority} : PropsElements) {
  return (
    <div>
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
            <DropdownMenuRadioItem className="variant" value="Critical">
              Critical
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropDownMenuList;

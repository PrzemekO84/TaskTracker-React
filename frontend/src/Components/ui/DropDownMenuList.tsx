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
          <Button className="w-full text-foreground bg-background hover:border-black dark:bg-stone-900 dark:hover:border-purple-950 p-5 border-2 rounded-md">
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
            <DropdownMenuRadioItem className="text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"value="Critical">
              Critical
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"value="High">High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"value="Medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"value="Low">Low</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropDownMenuList;

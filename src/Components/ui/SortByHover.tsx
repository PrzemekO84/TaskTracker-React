
import { DropdownMenu } from "./dropdown-menu";
import { DropdownMenuTrigger } from "./dropdown-menu";
import { DropdownMenuContent } from "./dropdown-menu";
import { useState, type Dispatch, type SetStateAction } from "react";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "./button";
import type { SortType } from "@/Types/types";

type PropsElements = {
    sort: Dispatch<SetStateAction<SortType>>;
}


function SortByHover({ sort } : PropsElements) {
    const [isOpen, setIsOpen] = useState(false);
    const [sortName, setSortName] = useState<string>("Sort By");

 
    return (
      <DropdownMenu
        open={isOpen}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        modal={false}
      >
        <DropdownMenuTrigger>
          <div
            className="flex items-center"
            onMouseEnter={() => setIsOpen(true)}
          >
            {sortName} <ChevronDown />{" "}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onMouseLeave={() => setIsOpen(false)}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className="flex flex-col gap-1
                p-2 2xl:text-lg bg-stone-950 text-white"
          >
            <Button
              onClick={() => {
                sort("createdNewest");
                setSortName("Created (Newest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Created (Newest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("createdOldest");
                setSortName("Created (Oldest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Created (Oldest) <ArrowDown />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("priorityHighest");
                setSortName("Priority (Highest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Priority (Highest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("priorityLowest");
                setSortName("Priority (Lowest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Priority (Lowest) <ArrowDown />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("deadlineSoonest");
                setSortName("Deadline (Soonest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Deadline (Soonest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("deadlineLatest");
                setSortName("Deadline (Latest)")
              }}
              className="p-6 hover:bg-stone-800"
            >
              Deadline (Latest) <ArrowDown />{" "}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default SortByHover;
  
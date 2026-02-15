
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
                p-2 2xl:text-lg dark:bg-background bg-stone-300"
          >
            <Button
              onClick={() => {
                sort("createdNewest");
                setSortName("Created (Newest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Created (Newest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("createdOldest");
                setSortName("Created (Oldest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Created (Oldest) <ArrowDown />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("priorityHighest");
                setSortName("Priority (Highest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Priority (Highest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("priorityLowest");
                setSortName("Priority (Lowest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Priority (Lowest) <ArrowDown />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("deadlineSoonest");
                setSortName("Deadline (Soonest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Deadline (Soonest) <ArrowUp />{" "}
            </Button>
            <Button
              onClick={() => {
                sort("deadlineLatest");
                setSortName("Deadline (Latest)")
              }}
              className="p-6 linkHighlight bg-stone-100 dark:bg-stone-900 text-foreground"
            >
              Deadline (Latest) <ArrowDown />{" "}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default SortByHover;
  
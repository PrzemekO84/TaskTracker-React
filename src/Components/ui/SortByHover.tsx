
import { DropdownMenu } from "./dropdown-menu";
import { DropdownMenuTrigger } from "./dropdown-menu";
import { DropdownMenuContent } from "./dropdown-menu";
import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "./button";

function DropdownHover() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownMenu open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal={false}>
            <DropdownMenuTrigger>
                <div className="flex items-center" onMouseEnter={() => setIsOpen(true)}>Sort By <ChevronDown /> </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onMouseLeave={() => setIsOpen(false)}
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="flex flex-col gap-2 2xl:text-lg p-1 bg-stone-900 text-white">
                    <Button className="p-6 hover:bg-stone-800">Created (Newest) <ArrowUp /> </Button>
                    <Button className="p-6 hover:bg-stone-800">Created (Oldest) <ArrowDown /> </Button>
                    <Button className="p-6 hover:bg-stone-800">Priority (Highest) <ArrowUp /> </Button>
                    <Button className="p-6 hover:bg-stone-800">Deadline (Soonest) <ArrowUp /> </Button>
                    <Button className="p-6 hover:bg-stone-800">Deadline (Latest) <ArrowDown /> </Button>
                </div>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default DropdownHover;
  
import type { Priority } from "@/Types/types";
import { toUpperCase, priorityColor } from "@/utils/HelpFun";

type PropsElements = {
    name: string;
    priority: Priority;
    created: string;
    until?: string;
    time?: string;
    tasksLength: number;
};

function ListBox({name, priority, created, until, time, tasksLength} : PropsElements){

    return (
        <div className="flex flex-col gap-5 justify-between bg-stone-900
        border-2 border-stone-700 text-xl rounded-lg p-4 items-center text-center cursor-pointer divBorderHover">
            <p className="text-3xl border-b-5 w-full h-auto p-2 rounded-md border-purple-900 ">{toUpperCase(name)}</p>
            <p className={`${priorityColor(priority)}`}>Priority: {priority}</p>
            <p>Tasks: {tasksLength}</p>
            <p>Day deadline: {until}</p>
            <p>Time deadline: {time}</p>
            <p>Created: {created}</p>
        </div>
    )
}

export default ListBox;
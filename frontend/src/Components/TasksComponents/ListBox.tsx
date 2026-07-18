import type { Priority } from "@/Types/types";
import { toUpperCase, priorityColor } from "@/utils/HelpFun";
import { dayDeadlineFormat } from "@/utils/HelpFun";

type PropsElements = {
    name: string;
    priority: Priority;
    created: string;
    until: string;
    time: string;
    tasksLength: string;
};


function ListBox({name, priority, created, until, time, tasksLength} : PropsElements){

    console.log(tasksLength);

    return (
        <div className="flex flex-col gap-5 justify-between 
        border-3 text-xl rounded-lg p-4 items-center text-center cursor-pointer divBorderHover">
            <p className="text-3xl border-b-5 w-full h-auto p-2 rounded-md border-purple-950 ">{toUpperCase(name)}</p>
            <p className={`${priorityColor(priority)}`}>Priority: {priority}</p>
            <p>Tasks: {tasksLength}</p>
            {/* <p>Day deadline: {until === "None" ? until : dayDeadlineFormat(until)}</p>
            <p>Time deadline: {time === "None" ? time : time.slice(0, 5)}</p>
            <p>Created: {dayDeadlineFormat(created)}</p> */}
        </div>
    )
}

export default ListBox;

//Trzeba dobrze mapowac te dane tutaj ale potrzebujemy najpierw stworzyc dodawanie list
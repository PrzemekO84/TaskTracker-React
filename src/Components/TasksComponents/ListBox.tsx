import type { Priority } from "@/Types/types";
import { toUpperCase } from "@/utils/HelpFun";

type PropsElements = {
  name: string;
  priority: Priority;
  created: string,
  until?: string,
  time?: string
};

function ListBox({name, priority, created, until, time} : PropsElements){
    return (
        <div className="flex flex-col gap-5 justify-between bg-stone-900
        border-2 border-purple-800 text-xl rounded-lg p-4 items-center border-purple-800 text-center cursor-pointer">
            <p className="text-3xl border-2 w-full p-2 rounded-xl border-purple-900 bg-stone-950">{toUpperCase(name)}</p>
            <p>Priority: {priority}</p>
            <p>Number of tasks: </p>
            <p>Day deadline: {until}</p>
            <p>Time deadline: {time}</p>
            <p>Created: {created}</p>
        </div>
    )
}

export default ListBox;
import type { Priority } from "@/Types/types";

type PropsElements = {
  name: string;
  priority: Priority;
  created: string,
  until?: string,
  time?: string
};

function ListBox({name, priority, created, until, time} : PropsElements){
    return (
        <div className="flex flex-col justify-between items-center px-2 py-2 text-2xl border-2 border-purple-800 text-center cursor-pointer">
            <p>Name: {name}</p>
            <p>Priority: {priority}</p>
            <p>Until: {until}</p>
            <p>Time: {time}</p>
            <p>Created: {created}</p>
        </div>
    )
}

export default ListBox;
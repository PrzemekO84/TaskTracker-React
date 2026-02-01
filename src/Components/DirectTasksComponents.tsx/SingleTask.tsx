import type { RenderedTask } from "@/Types/types";

function SingleTask({id, name, priority, created, until, time, completed, } : RenderedTask) {
  return (
    <div className="flex gap-4 border-2 border-purple-900 p-4 wrap-break-word">
      <h1>{id}</h1>
      <h1>{name}</h1>
      <h1>Priority: {priority}</h1>
      <h1>{created}</h1>
      <h1>{until}</h1>
      <h1>{time}</h1>
      <h1>{completed}</h1>
    </div>
  );
}

export default SingleTask;
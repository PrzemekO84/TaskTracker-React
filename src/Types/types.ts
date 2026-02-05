export type Task = {
  id: string;
  name: string;
  priority: Priority;
  created: string;
  until: string;
  time: string;
  completed: boolean;
};

export type List = {
  id: string;
  name: string;
  priority: Priority; 
  created: string;
  until: string;
  time: string;
  tasks: Task[]; 
};

export type RenderedTask = {
  id: number;
  taskId: string;
  name: string;
  priority: Priority;
  created: string;
  until: string;
  time: string;
  completed: boolean;
  listId: string;
}

export type Priority = "Critical" | "High" | "Medium" | "Low";


export type TasksCounter = {
  criticalTasks: number;
  highTasks: number;
  mediumTasks: number;
  lowTasks: number;
}

export type MonthlyCounter = {
  month: string;
  count: number;
}

export type SortType = "createdNewest" | "createdOldest" | "priorityHighest" | "priorityLowest" | "deadlineSoonest" | "deadlineLatest" | "default";



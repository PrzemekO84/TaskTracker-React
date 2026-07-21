export type Task = {
  id: string;
  list_id: string
  name: string;
  priority: Priority;
  created: string;
  until: string;
  time: string;
  completed: boolean
};

export type List = {
  list_id: string,
  name: string,
  priority: Priority,
  created_at: string,
  until: string | null,
  time: string |null,
  tasks_count: string
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

export type RegisterUser = {
  username: string, 
  email: string,
  password: string
}

export type LoginUser = {
  email_username: string, 
  password: string
}

export type ErrorMessage = {
  isError: boolean,
  message: string,
  status: "error" | "success" | null
}


export type dashboardTaskInfo = {
  totalTaskCounter: number,
  priorityTaskCounter : TasksCounter
}

export type AllTaskData = {
  undoneTaskData: TasksCounter,
  doneTaskData: TasksCounter
  monthlyTaskData: monthlyTaskData[],
  dailyTaskData: number
}

export type TaskData = {
  priority: Priority,
  taskCount: string
}

export type monthlyTaskData = {
  month: number,
  count: number
}



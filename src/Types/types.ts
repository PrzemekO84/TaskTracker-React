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
  name: string;
  priority: Priority;
  created: string;
  until: string;
  time: string;
  completed: boolean;
}

export type Priority = "Critical" | "High" | "Medium" | "Low" | "";

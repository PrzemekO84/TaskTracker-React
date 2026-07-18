export type Priority = "Critical" | "High" | "Medium" | "Low";

export type RegisterUser = {
    username: string,
    email: string,
    password: string
}

export type LoginUser = {
  email_username: string, 
  password: string
}

export type List = {
  list_id: string,
  name: string,
  priority: Priority,
  created_at: string,
  until: string,
  time: string
}

export type Task = {
  task_id: string,
  list_id: string,
  name: string,
  priority: Priority,
  created_at: Date,
  until: Date,
  time: string
  
  completed: boolean
}

export type tasksData = {
  count: number, 
  priority: Priority
}

export type AddListRequest = {
  list: List
}

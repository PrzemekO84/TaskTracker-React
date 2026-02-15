import type { List } from "@/Types/types";

export const initialData: List[] = [
  {
    id: "testData",
    name: "Test List",
    priority: "High",
    created: new Date().toDateString(),
    until: new Date(Date.now() + 86400000).toDateString(), 
    time: "12:00",
    tasks: [
      { id: "t1", name: "Test taks 1", priority: "High", completed: true, created: "...", until: new Date(Date.now() + 86400000).toDateString(), time: "12:00" },
      { id: "t2", name: "Test task 2", priority: "Critical", completed: false, created: "...", until: new Date(Date.now() + 86400000).toDateString(), time: "14:00" }
    ]
  },
  {
    id: "testData2",
    name: "Test List2",
    priority: "Medium",
    created: new Date().toDateString(),
    until: new Date(Date.now() + 86400000).toDateString(), 
    time: "12:00",
    tasks: [
      { id: "t1", name: "Test taks 1", priority: "High", completed: true, created: "...", until: new Date(Date.now() + 86400000).toDateString(), time: "12:00" },
      { id: "t2", name: "Test task 2", priority: "Low", completed: false, created: "...", until: new Date(Date.now() + 86400000).toDateString(), time: "14:00" }
    ]
  }
  
];

export const startingMonthlyData = {
    "1-2026": 15,
    "2-2026": 2
};
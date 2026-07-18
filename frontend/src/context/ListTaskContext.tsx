import type { 
  List, 
  Task, 
  MonthlyCounter, 
  Priority, 
  TaskData,
  dashboardTaskInfo,
  AllTaskData
} from "@/Types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getLists, getAllTaskData } from "@/Services/ApiService";
import type { TasksCounter } from "@/Types/types";
import { initialData } from "@/utils/startingData";
import { startingMonthlyData } from "@/utils/startingData";


type ListTaskContextType = {
    listInfo: List[],
    getAllLists: () => void;
    taskInfo: Task[],
    updateDashboardData: () => void;
    taskDashboardData: AllTaskData
    // addListItem: (list: List) => void,
    // editListItem: (updateItem: List, listId: string) => void,
    // deleteListItem: (listId: string) => void,
    // addTaskItem: (listId: string, newTask: Task) => void,
    // editTaskItem: (listId: string, taskId: string, newTask: Task) => void
    // deleteTaskItem: (listId: string, taskId: string) => void
    // getTotalTasksLength: () => number;
    // getTasksLengthByPriority: () => TasksCounter;
    // setDailyCounter: () => void;
    // dailyCount: number;
    // setMonthlyCounter: () => void;
    // monthlyCount: {[key: string]: number};
    // getTotalCompletedTaskLength: () => number;
    // updateTaskByPriorityCounter: (priority: Priority) => void;
    // taskByPriorityCounter: TasksCounter;
};

export const ListTaskContext = createContext<ListTaskContextType | undefined>(undefined);

export const ListTaskProvider = ({ children } : {children: React.ReactNode}) => {
    const [listInfo, setListInfo] = useState<List[]>([]);
    const [taskInfo, setTaskInfo] = useState<Task[]>([]);
    const [taskDashboardData, setTaskDashboardData] = useState<AllTaskData>({
      undoneTaskData: {criticalTasks: 0, highTasks: 0, mediumTasks: 0, lowTasks: 0},
      doneTaskData: {criticalTasks: 0, highTasks: 0, mediumTasks: 0, lowTasks: 0},
      monthlyTaskData: [],
      dailyTaskData: 0
    });

    const { user } = useUserContext();

    async function getAllLists(){
      try {
        const result = await getLists();
        const data = result.data.data;

      setListInfo(data)
      } catch (error) {
        console.log("Error during getting lists");
        console.log(error);
      }
    }

    async function updateDashboardData(){
      try {
        const result = await allTaskData();
        setTaskDashboardData(result);
      } catch (error) {
        console.log("Error during updating the dashboard data.");
        console.log(error);
      }
      
    }

    async function allTaskData() {

      const result = await getAllTaskData();
      const data = result.data.data;

      let undoneTaskPriorityCounter: TasksCounter = {
        criticalTasks: 0,
        highTasks: 0,
        mediumTasks: 0,
        lowTasks: 0
      }

      let doneTaskPriorityCounter: TasksCounter = {
        criticalTasks: 0,
        highTasks: 0,
        mediumTasks: 0,
        lowTasks: 0
      }

      
      data.undoneTaskData.forEach((data: TaskData) => {
        switch(data.priority){
            case "Critical":
              undoneTaskPriorityCounter.criticalTasks = parseInt(data.taskCount);
              break;
            case "High":
              undoneTaskPriorityCounter.highTasks = parseInt(data.taskCount);
              break;
            case "Medium":
              undoneTaskPriorityCounter.mediumTasks = parseInt(data.taskCount);
              break;
            case "Low":
              undoneTaskPriorityCounter.lowTasks = parseInt(data.taskCount);
              break;
          }
      });

      data.doneTaskData.forEach((data: TaskData) => {
        switch(data.priority){
            case "Critical":
              doneTaskPriorityCounter.criticalTasks = parseInt(data.taskCount);
              break;
            case "High":
              doneTaskPriorityCounter.highTasks = parseInt(data.taskCount);
              break;
            case "Medium":
              doneTaskPriorityCounter.mediumTasks = parseInt(data.taskCount);
              break;
            case "Low":
              doneTaskPriorityCounter.lowTasks = parseInt(data.taskCount);
              break;
          }
      })

      return {
        undoneTaskData: undoneTaskPriorityCounter,
        doneTaskData: doneTaskPriorityCounter,
        monthlyTaskData: data.monthlyTaskData,
        dailyTaskData: parseInt(data.dailyTaskData)
      };
        
    }

    // function getTotalCompletedTaskLength(){

    //   const taskCount = Object.values(monthlyCount);
    //   const totalTaskCount = taskCount.reduce((acc, current) => acc + current)

    //   return totalTaskCount;
    // }

    //testData
    // const [taskByPriorityCounter, setTaskByPriorityCounter] = useState<TasksCounter>({
    //   criticalTasks: 2,
    //   highTasks: 2,
    //   mediumTasks: 2,
    //   lowTasks: 2,
    // });

    // function updateTaskByPriorityCounter(priority : Priority){
    //   switch(priority){
    //     case "Critical":  
    //     setTaskByPriorityCounter((prevCount) => {
    //       return {
    //         ...prevCount,
    //         criticalTasks: prevCount.criticalTasks + 1
    //       }
    //     });
    //     break;
    //     case "High": 
    //     setTaskByPriorityCounter((prevCount) => {
    //       return {
    //         ...prevCount,
    //         highTasks: prevCount.highTasks + 1
    //       }
    //     });
    //     break;
    //     case "Medium": 
    //     setTaskByPriorityCounter((prevCount) => {
    //       return {
    //         ...prevCount,
    //         mediumTasks: prevCount.mediumTasks + 1
    //       }
    //     });
    //     break;
    //     case "Low": 
    //     setTaskByPriorityCounter((prevCount) => {
    //       return {
    //         ...prevCount,
    //         lowTasks: prevCount.lowTasks + 1
    //       }
    //     });
    //     break;
    //   }
    // }

    // useEffect(() => {
    //   localStorage.setItem("listInfo", JSON.stringify(listInfo));
    // }, [listInfo]);

    // const [dailyCount, setDailyCount] = useState(() => {
    //     const saved = localStorage.getItem("dailyCounter");

    //     if(saved){
    //         const { count, date } = JSON.parse(saved);
    //         if(date === new Date().toDateString()) return count;
    //     }
    //     return 0;
    // })

    // function setDailyCounter() {
    //   setDailyCount((prevCount: number) => {
    //     const newCount = prevCount + 1;
    //     localStorage.setItem(
    //       "dailyCounter",
    //       JSON.stringify({
    //         count: newCount,
    //         date: new Date().toDateString(),
    //       }),
    //     );
    //     return newCount;
    //   });
    // }


    // const [monthlyCount, setMonthlyCount] = useState<{[key: string]: number}>(() => {
    //     const saved = localStorage.getItem("monthlyCounter");

    //     return saved ? JSON.parse(saved) : startingMonthlyData;
    // })

    // function setMonthlyCounter(){
    //     const date = new Date();
    //     const monthKey = `${date.getMonth() + 1}-${date.getFullYear()}`

    //     const currentMonth = { ...monthlyCount };

    //     if(currentMonth[monthKey]){
    //         currentMonth[monthKey] = currentMonth[monthKey] + 1;
    //     }
    //     else{
    //         currentMonth[monthKey] = 1;
    //     }

    //     setMonthlyCount(currentMonth);
    //     localStorage.setItem("monthlyCounter", JSON.stringify(currentMonth));
    // }

    

    // function addListItem(item: List){
    //     setListInfo((prevInfo) => {
    //         return [
    //             ...prevInfo,
    //             item
    //         ]  
    //     }) 
    // }

    // function editListItem(updatedList: List, listId: string) {
    //     setListInfo((prevList) => {
    //         return prevList.map((list) =>{
    //             if(list.id === listId){
    //                 return updatedList;
    //             }
    //             return list
    //         })
    //     })
    // }

    // function deleteListItem(itemId: string){
    //     setListInfo((prevInfo) => {
    //         return prevInfo.filter((item) => {
    //             return item.id !== itemId;
    //         })
    //     })
    // }

    // function addTaskItem(listId: string, newTask: Task){
    //     setListInfo((prevList) => {
    //         return prevList.map((list) => {
    //             if(list.id === listId){
    //                 return {
    //                     ...list,
    //                     tasks: [...list.tasks, newTask]
    //                 }
    //             }
    //             return list;
    //         })
    //     })
    // }

    // function editTaskItem(listId: string, taskId: string, newTask: Task) {
    //   setListInfo((prevList) => {
    //     return prevList.map((list) => {
    //       if (list.id === listId) {
    //         return {
    //           ...list,
    //           tasks: list.tasks.map((task) => {
    //             if (task.id === taskId) {
    //                 return newTask;
    //             }
    //             return task
    //           }),
    //         };
    //       }
    //       return list
    //     });
    //   });
    // }

    // function deleteTaskItem(listId: string, taskId: string) {
    //   setListInfo((prevList) => {
    //     return prevList.map((list) => {
    //       if(list.id === listId) {
    //         return {
    //           ...list,
    //           tasks: list.tasks.filter((task) => {
    //             return task.id !== taskId;
    //           }),
    //         };
    //       }
    //       return list;
    //     });
    //   });
    // }


    return (
        <ListTaskContext.Provider value={{listInfo, getAllLists, taskInfo, updateDashboardData, taskDashboardData}}>
            {children}
        </ListTaskContext.Provider>
    )
 }

export function useListTaskContext(){
    const ListTask = useContext(ListTaskContext);

    if(ListTask === undefined){
        throw Error("ListTask must be used with ListTaskContext")
    }

    return ListTask;
}

// addListItem, editListItem, deleteListItem, addTaskItem, editTaskItem, 
//         deleteTaskItem, getTotalTasksLength, setMonthlyCounter,
//         getTasksLengthByPriority, setDailyCounter, dailyCount, monthlyCount, getTotalCompletedTaskLength,
//         updateTaskByPriorityCounter, taskByPriorityCounter




//Trzeba pobrac akutalne list_id czy tam list_id + 1 i to wrzucic do CreateList 
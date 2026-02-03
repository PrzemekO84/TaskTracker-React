import type { List, Task, MonthlyCounter } from "@/Types/types";
import { createContext, useContext, useState } from "react";
import type { TasksCounter } from "@/Types/types";

type ListTaskContextType = {
    listInfo: List[],
    addListItem: (list: List) => void,
    editListItem: (updateItem: List, itemId: string) => void,
    deleteListItem: (itemId: string) => void,
    addTaskItem: (listId: string, newTask: Task) => void,
    editTaskItem: (listId: string, taskId: string, newTask: Task) => void
    deleteTaskItem: (listId: string, taskId: string) => void
    getTotalTasksLength: () => number;
    getTasksLengthByPriority: () => TasksCounter;
    setDailyCounter: () => void;
    dailyCount: number;
    setMonthlyCounter: () => void;
    monthlyCount: {[key: string]: number};
};


export const ListTaskContext = createContext<ListTaskContextType | undefined>(undefined);

export const ListTaskProvider = ({ children } : {children: React.ReactNode}) => {
    const [listInfo, setListInfo] = useState<List[]>([]);

    const [dailyCount, setDailyCount] = useState(() => {
        const saved = localStorage.getItem("dailyCounter");

        if(saved){
            const { count, date } = JSON.parse(saved);
            if(date === new Date().toDateString()) return count;
        }
        return 0;
    })

    function setDailyCounter(){
        setDailyCount((prevCount: number) => {
            const newCount = prevCount + 1;
            localStorage.setItem("dailyCounter", JSON.stringify({
                count: newCount,
                date: new Date().toDateString()
            }))
            return newCount;
        })
    }


    const [monthlyCount, setMontlyCount] = useState<{[key: string]: number}>(() => {
        const saved = localStorage.getItem("montlyCounter");

        return saved ? JSON.parse(saved) : {}
    })

    function setMonthlyCounter(){
        const date = new Date();
        const monthKey = `${date.getMonth() + 1}-${date.getFullYear()}`

        const currentMonth = { ...monthlyCount };

        if(currentMonth[monthKey]){
            currentMonth[monthKey] = currentMonth[monthKey] + 1;
        }
        else{
            currentMonth[monthKey] = 1;
        }

        setMontlyCount(currentMonth);
        localStorage.setItem("montlyCounter", JSON.stringify(currentMonth));
    }

    

    function addListItem(item: List){
        setListInfo((prevInfo) => {
            return [
                ...prevInfo,
                item
            ]  
        }) 
    }

    function editListItem(updatedList: List, listId: string) {
        setListInfo((prevList) => {
            return prevList.map((list) =>{
                if(list.id === listId){
                    return updatedList;
                }
                return list
            })
        })
    }

    function deleteListItem(itemId: string){
        setListInfo((prevInfo) => {
            return prevInfo.filter((item) => {
                return item.id !== itemId;
            })
        })
    }

    function addTaskItem(listId: string, newTask: Task){
        setListInfo((prevList) => {
            return prevList.map((list) => {
                if(list.id === listId){
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask]
                    }
                }
                return list;
            })
        })
    }

    function editTaskItem(listId: string, taskId: string, newTask: Task) {
      setListInfo((prevList) => {
        return prevList.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                    return newTask;
                }
                return task
              }),
            };
          }
          return list
        });
      });
    }

    function deleteTaskItem(listId: string, taskId: string) {
      setListInfo((prevList) => {
        return prevList.map((list) => {
          if(list.id === listId) {
            return {
              ...list,
              tasks: list.tasks.filter((task) => {
                return task.id !== taskId;
              }),
            };
          }
          return list;
        });
      });
    }

    function getTotalTasksLength(){
        let counter: number = 0;
        listInfo.forEach(list => {
            console.log(list.tasks.length);
            counter += list.tasks.length;
        });

        return counter;
    }

    function getTasksLengthByPriority() {
      let tasks: TasksCounter = {
        criticalTasks: 0,
        highTasks: 0,
        mediumTasks: 0,
        lowTasks: 0,
      };

      listInfo.forEach((list) => {
        list.tasks.forEach((task) => {
          switch (task.priority) {
            case "Critical":
              return tasks.criticalTasks++;
            case "High":
              return tasks.highTasks++;
            case "Medium":
              return tasks.mediumTasks++;
            case "Low":
              return tasks.lowTasks++;
          }
        });
      });

      return tasks;
    }

    return (
        <ListTaskContext.Provider value={{listInfo, addListItem, editListItem, deleteListItem, addTaskItem, editTaskItem, 
        deleteTaskItem, getTotalTasksLength, setMonthlyCounter,
        getTasksLengthByPriority, setDailyCounter, dailyCount, monthlyCount}}>
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
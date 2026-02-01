import type { List, Task } from "@/Types/types";
import { createContext, useContext, useState } from "react";

type ListTaskContextType = {
    listInfo: List[],
    addListItem: (list: List) => void,
    editListItem: (updateItem: List, itemId: string) => void,
    deleteListItem: (itemId: string) => void,
    addTaskItem: (listId: string, newTask: Task) => void,
    editTaskItem: (listId: string, taskId: string, newTask: Task) => void
    deleteTaskItem: (listId: string, taskId: string) => void
};


export const ListTaskContext = createContext<ListTaskContextType | undefined>(undefined);

export const ListTaskProvider = ({ children } : {children: React.ReactNode}) => {
    const [listInfo, setListInfo] = useState<List[]>([]);

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

    return (
        <ListTaskContext.Provider value={{listInfo, addListItem, editListItem, deleteListItem, addTaskItem, editTaskItem, deleteTaskItem}}>
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
import type { ListTask } from "@/Types/types";
import { createContext, useContext, useState } from "react";

type ListTaskContextType = {
    info: ListTask[],
    addItem: (item: ListTask) => void,
    editItem: (updateItem: ListTask, itemId: string) => void,
    deleteItem: (itemId: string) => void
};


export const ListTaskContext = createContext<ListTaskContextType | undefined>(undefined);

export const ListTaskProvider = ({ children } : {children: React.ReactNode}) => {
    const [info, setInfo] = useState<ListTask[]>([]);

    function addItem(item: ListTask){
        setInfo((prevInfo) => {
            return [
                ...prevInfo,
                item
            ]  
        }) 
    }

    function editItem(updateItem: ListTask, itemId: string) {
      setInfo((prevInfo) => {
        return prevInfo.filter((item) => {
          if(item.id === itemId){
            return [
                item = updateItem
            ]
          };
        });
      });
    }

    function deleteItem(itemId: string){
        setInfo((prevInfo) => {
            return prevInfo.filter((item) => {
                return item.id !== itemId;
            })
        })
    }

    return (
        <ListTaskContext.Provider value={{info, addItem, editItem, deleteItem}}>
            {children}
        </ListTaskContext.Provider>
    )
 }

export function useListTaskContext(){
    const ListTask = useContext(ListTaskContext);

    console.log("XDDD")

    if(ListTask === undefined){
        throw Error("ListTask must be used with ListTaskContext")
    }

    return ListTask;
}
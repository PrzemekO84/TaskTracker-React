import type { List, Priority, Task } from "@/Types/types";



// Created (Newest) 
// Created (Oldest) 
// Priority (Highest)
// Deadline (Soonest)
// Deadline (Latest)

const PriorityByNumber = {"Critical": 3, "High": 2, "Medium": 1, "Low": 0}


export function sortCreatedList(lists: List[], type: string){

    const sortedCreated = [...lists];
    
    if(type === "Oldest"){
        sortedCreated.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }
    else if(type === "Newest"){
        sortedCreated.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    }

    return sortedCreated; 
}


export function sortPriorityList(tasks: List[], type: string){


    const sortedPriority = [...tasks];

    if(type === "Lowest"){
        sortedPriority.sort((a, b) => PriorityByNumber[a.priority] - PriorityByNumber[b.priority]);
    }
    else if(type === "Highest"){
        sortedPriority.sort((a, b) => PriorityByNumber[b.priority] - PriorityByNumber[a.priority]);
    }

    return sortedPriority; 

}


export function sortDeadlineList(lists: List[], type: string) {

    const sortedDeadline = [...lists]

    if (type === "Soonest") {
        sortedDeadline.sort((a, b) => {
            if (a.until === "None") return 1;
            if (b.until === "None") return -1;
            return new Date(a.until).getTime() - new Date(b.until).getTime()
        })
    }
    else if (type === "Latest") {
        sortedDeadline.sort((a, b) => {
            if (a.until === "None") return 1;
            if (b.until === "None") return -1;
            return new Date(b.until).getTime() - new Date(a.until).getTime();
        })
    }


    return sortedDeadline;
}

export function sortCreatedTasks (tasks: Task[], type: string){
    
    const sortedCreatedTasks = [...tasks];

    if(type === "Oldest"){
        sortedCreatedTasks.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }
    else if(type === "Newest"){
        sortedCreatedTasks.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    }

    return sortedCreatedTasks;
}

export function sortPriorityTasks(tasks: Task[], type: string){

    const sortedPriorityTasks = [...tasks];

    if(type === "Lowest"){
        sortedPriorityTasks.sort((a, b) => PriorityByNumber[a.priority] - PriorityByNumber[b.priority]);
    }
    else if(type === "Highest"){
        sortedPriorityTasks.sort((a, b) => PriorityByNumber[b.priority] - PriorityByNumber[a.priority]);
    }

    return sortedPriorityTasks;
}

export function sortDeadlineTasks(tasks: Task[], type: string) {

    const sortedDeadlineTasks = [...tasks]

    if (type === "Soonest") {
        sortedDeadlineTasks.sort((a, b) => {
            if (a.until === "None") return 1;
            if (b.until === "None") return -1;
            return new Date(a.until).getTime() - new Date(b.until).getTime()
        })
    }
    else if (type === "Latest") {
        sortedDeadlineTasks.sort((a, b) => {
            if (a.until === "None") return 1;
            if (b.until === "None") return -1;
            return new Date(b.until).getTime() - new Date(a.until).getTime();
        })
    }

    return sortedDeadlineTasks;
}





export type ListTask = {
    name: string,
    priority: Priority
    created: string | Date,
    until?: string | Date
    //Moglby byc tez time?
};

export type Priority = "Critical" | "High" | "Medium" | "Low";

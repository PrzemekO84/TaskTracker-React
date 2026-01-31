
export type ListTask = {
    id: string,
    name: string,
    priority: Priority
    created: string,
    until?: string,
    time?: string
};

export type Priority = "Critical" | "High" | "Medium" | "Low" | "";

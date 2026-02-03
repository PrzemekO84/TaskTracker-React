import type { Priority } from "@/Types/types";


export const toUpperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}  

export const priorityColor = (priority: Priority) => {
    switch(priority){
        case "Critical":
            return "text-red-700"
        case "High":
            return "text-amber-600"
        case "Medium":
            return "text-sky-600"
        case "Low":
            return "text-green-700"
    }
}

export const createdDateFormat = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = day.toString().padStart(2, "0") + "." + month.toString().padStart(2, "0") + "." + year;
    return createdDate;
}

export const getMonthName = (monthNum: number) => {
    switch(monthNum){
        case 1:
            return "January"
        case 2:
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
        default:
            return ""
    }
}
import { format } from "date-fns"

export function FormatDate(timestap:number){
    const date = new Date(timestap)

    return format(date, 'dd/MM/yyyy HH:mm')

}
import { TaskStateModel } from "./TaskStateModel";

export type TaskModel={
    id:string;
    name:string;
    duration:number;
    startDate:number;
    completeDate:number | null;//quando time chega ao final
    interrupDate:number | null;
    type: keyof TaskStateModel['config'];
}
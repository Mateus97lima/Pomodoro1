import { TaskModel } from "../models/TaskModel";

export function getTaskState (task:TaskModel, activeTask:TaskModel | null){
if(task.completeDate) return 'completa';
if(task.interrupDate) return 'interrompida';
if(task.id === activeTask?.id) return 'progresso'
return 'Abandonada'
}
import { createContext } from "react";
import { TaskStateModel } from "../../models/TaskStateModel";
import { InitialTaskState } from "./InitialTaskState";
import { TaskActionModel } from "./TaskAction";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: InitialTaskState,
  dispatch: () => {},
};
export const TaskContext = createContext<TaskContextProps>(initialContextValue);

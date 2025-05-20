import { TaskStateModel } from "../../models/TaskStateModel";
import { formattedSeconds } from "../../utils/formattedSeconds";
import { getNextCycles } from "../../utils/getNextCycles";
import { InitialTaskState } from "./InitialTaskState";
import { TaskActionModel, TaskActionTypes } from "./TaskAction";

export function TaskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCyles = getNextCycles(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCyles,
        secondsRemaining,
        formattedSecondsRemaining: formattedSeconds(secondsRemaining),
        tasKs: [...state.tasKs, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasKs: state.tasKs.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interrupDate: Date.now() };
          }
          return task;
        }), // Não duplica tarefa aqui
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,

        activeTask:null,
        secondsRemaining:0,
        formattedSecondsRemaining:"00:00",
        tasKs: state.tasKs.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {...task, completeDate:Date.now() };

          }
          return task;
        }), // Não duplica tarefa aqui
      };
    }
     case TaskActionTypes.RESET_STATE: {
      return {...InitialTaskState};
    }

    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formattedSeconds(
          action.payload.secondsRemaining,
        ),
      };
    }
      case TaskActionTypes.CHANGE_SETTINGS: {
      return {...state,config:{...action.payload}};
    }
  }

  return state;
}

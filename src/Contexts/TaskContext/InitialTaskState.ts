import { TaskStateModel } from "../../models/TaskStateModel";

 
    export const InitialTaskState: TaskStateModel = {
        tasKs: [],
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        activeTask: null,
        currentCycle: 0,
        config: {
          workTime: 1,
          shortBreakTime: 1,
          longBreakTime: 1,
        },
      };

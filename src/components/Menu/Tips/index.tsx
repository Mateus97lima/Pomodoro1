import { useTaskContext } from "../../../Contexts/TaskContext/useTaskContext";
import { getNextCycles } from "../../../utils/getNextCycles";
import { getNextCyclesType } from "../../../utils/getNextCyclesType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCyles = getNextCycles(state.currentCycle);
  const nextSeconds = getNextCyclesType(nextCyles);

  //tips
  const tipsActivoTask = {
    workTime: <span>foque por {state.config.workTime} min </span>,
    longBreakTime: <span>Descanso longo {state.config.longBreakTime} min</span>,
    shortBreakTime: <span> Descanse por {state.config.shortBreakTime} min</span>,
  };
  const tipsForNoActivoTask = {
    workTime: <span>Próximo ciclo é em {state.config.workTime} min </span>,
    longBreakTime: (
      <span>Próximo descanso longo é em {state.config.longBreakTime} min </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é em {state.config.shortBreakTime} min</span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsActivoTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActivoTask[nextSeconds]}
    </>
  );
}

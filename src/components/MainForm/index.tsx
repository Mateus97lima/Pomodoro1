import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext";

import { getNextCyclesType } from "../../utils/getNextCyclesType";


import { TaskActionTypes } from "../../Contexts/TaskContext/TaskAction";
import { getNextCycles } from "../../utils/getNextCycles";
import { Tips } from "../Menu/Tips";


import { showMessage } from "../../adapters/showMessage";


export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const TaskInput = useRef<HTMLInputElement>(null);

  const nextCyles = getNextCycles(state.currentCycle);
  const nextSeconds = getNextCyclesType(nextCyles);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
       showMessage.dismiss()

    if (TaskInput.current === null) return;

    const TaskName = TaskInput.current.value.trim();

    if (!TaskName) {

      showMessage.warn("Digite seu objetivo");

      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: TaskName,
      startDate: Date.now(),
      completeDate: null,
      interrupDate: null,
      duration: state.config[nextSeconds],
      type: nextSeconds,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleClickInterrup() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="from">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          id="qualquer"
          type="text"
          placeholder="Diga sua missão de hoje"
          ref={TaskInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            icon={<PlayCircleIcon />}
            type="submit"
            aria-label="Inicia o tempo"
            title="Iniciar o tempo"
            color="green"
            key={"esse e o botão submit"}
          />
        ) : (
          <DefaultButton
            type="button"
            aria-label="Parar tempo"
            title="Parar o tempo"
            icon={<StopCircleIcon />}
            color="red"
            onClick={handleClickInterrup}
            key={"não envia o form"}
          />
        )}
      </div>
    </form>
  );
}

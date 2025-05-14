import { TrashIcon } from "lucide-react";
import { MainTemplate } from "../../templades/MainTemplate";
import { Container } from "../Container";
import { DefaultButton } from "../DefaultButton";
import { Heading } from "../Heading";

import styles from "./style.module.css";

import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext";
import { FormatDate } from "../../utils/formattedDate";
import { getTaskState } from "../../utils/getTaskStatus";

export function History() {
  const { state } = useTaskContext();
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-labelledby="Apagar History"
              title="Apagar todo History"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipos</th>
              </tr>
            </thead>

            <tbody>
              {state.tasKs.map((task) => {
                    const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: 'Descanso curto',
                  longBreakTime: 'Descanso longo',
                };
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}</td>
                    <td>{FormatDate(task.startDate)}</td>
                    <td>{getTaskState(task,state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}

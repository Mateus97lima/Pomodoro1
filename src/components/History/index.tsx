import { TrashIcon } from "lucide-react";
import { MainTemplate } from "../../templades/MainTemplate";
import { Container } from "../Container";
import { DefaultButton } from "../DefaultButton";
import { Heading } from "../Heading";

import styles from "./style.module.css";

import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext";
import { FormatDate } from "../../utils/formattedDate";
import { getTaskState } from "../../utils/getTaskStatus";
import {  sortTasks, SortTasksOptions } from "../../utils/shortTaskDate";
import { useState } from "react";

export function History() {
  const { state } = useTaskContext();
  const [sortTaskOption, setshortTaskOption] = useState<SortTasksOptions>(
    () => {
 return{
  tasks:sortTasks({tasks:state.tasKs}),
  field:'startDate',
  direction:'desc'
 };
  });

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOption.direction === 'desc' ? 'asc' : 'desc';

  setshortTaskOption({
    tasks:sortTasks({
      direction:newDirection,
      tasks:sortTaskOption.tasks,
      field,
    }),
    direction:newDirection,
    field,
  })
  }

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
              <tr >
                <th onClick={()=> handleSortTasks({field:'name'})} className={styles.thsort}>Tarefa ↕</th>
                <th onClick={()=> handleSortTasks({field:'duration'})} className={styles.thsort}>Duração ↕</th>
                <th onClick={()=> handleSortTasks({field:'startDate'})} className={styles.thsort}>Data ↕</th>
                <th> Status ↕</th>
                <th>Tipos ↕</th>
              </tr>
            </thead>

            <tbody>
              {sortTaskOption.tasks.map((task) => {
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

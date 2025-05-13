import styles from './styles.module.css'
import { getNextCycles } from '../../utils/getNextCycles';
import { getNextCyclesType } from '../../utils/getNextCyclesType';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleType = Array.from({ length: state.currentCycle });

  const ciclesDescripMap = {
    workTime: 'trabalho',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.Cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleType.map((_, index) => {
          const nextCycle = getNextCycles(index);
          const nextType = getNextCyclesType(nextCycle);
          return (
            <span
              key={nextCycle}
              className={`${styles.cycleDot} ${styles[nextType]}`}
              aria-label={`indicador de ciclos de ${ciclesDescripMap[nextType]}`}
              title={`indicador de ciclos de ${ciclesDescripMap[nextType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useReducer, useRef,  } from "react";
import { TaskContext } from "./TaskContext";
import { InitialTaskState } from "./InitialTaskState";
import { TaskReducer } from "./TaskReducer";
import { TimeWorkerManager } from "../../Worker/TimeWorkerManager";
import { TaskActionTypes } from "./TaskAction";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
    children:React.ReactNode;
  };
  
  export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state,dispatch]= useReducer(TaskReducer,InitialTaskState);
    const playBeepRef = useRef<()=> void | null>(null);
 
    const worker = TimeWorkerManager.getInstance()

    worker.onmessage(e => {
      const  countDownSeconds = e.data
   

     
      
      if(countDownSeconds <= 0) {
        if(playBeepRef.current){
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({
          type:TaskActionTypes.COMPLETE_TASK,
         
        }); worker.terminate();
      }else{
        dispatch({
          type:TaskActionTypes.COUNT_DOWN,
          payload: {secondsRemaining:countDownSeconds}
        })
      }
    });

    useEffect(()=>{
      if(!state.activeTask){
        worker.terminate()
      }
      document.title = `${state.formattedSecondsRemaining} - Chronos - Pomodoro`

      worker.postMessage(state);
     },[worker,state]);
     
     useEffect(()=>{
    if(state.activeTask && playBeepRef.current === null){
      playBeepRef.current = loadBeep();
    }else{
      playBeepRef.current = null;
    }
     },[state.activeTask])
  
    return (
      <TaskContext.Provider value={{state,dispatch}}>
        {children}
      </TaskContext.Provider>
    );
  }
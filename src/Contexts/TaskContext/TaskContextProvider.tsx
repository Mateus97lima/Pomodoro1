import { useEffect, useReducer,  } from "react";
import { TaskContext } from "./TaskContext";
import { InitialTaskState } from "./InitialTaskState";
import { TaskReducer } from "./TaskReducer";
import { TimeWorkerManager } from "../../Worker/TimeWorkerManager";
import { TaskActionTypes } from "./TaskAction";

type TaskContextProviderProps = {
    children:React.ReactNode;
  };
  
  export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state,dispatch]= useReducer(TaskReducer,InitialTaskState);
 
    const worker = TimeWorkerManager.getInstance()

    worker.onmessage(e => {
      const  countDownSeconds = e.data
      console.log(countDownSeconds);

     
      
      if(countDownSeconds <= 0) {
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
        console.log('worker terminate por falta de activeTask')
        worker.terminate()
      }

      worker.postMessage(state);
     },[worker,state]);
     
     
  
    return (
      <TaskContext.Provider value={{state,dispatch}}>
        {children}
      </TaskContext.Provider>
    );
  }
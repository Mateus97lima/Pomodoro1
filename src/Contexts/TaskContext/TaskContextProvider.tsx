import { useEffect, useReducer, useRef,  } from "react";
import { TaskContext } from "./TaskContext";
import { InitialTaskState } from "./InitialTaskState";
import { TaskReducer } from "./TaskReducer";
import { TimeWorkerManager } from "../../Worker/TimeWorkerManager";
import { TaskActionTypes } from "./TaskAction";
import { loadBeep } from "../../utils/loadBeep";
import { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
    children:React.ReactNode;
  };
  
  export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state,dispatch]= useReducer(TaskReducer,InitialTaskState, () => {
      const Storage = localStorage.getItem('state');
      if(Storage === null) return InitialTaskState

      const parsedStorage =JSON.parse(Storage) as TaskStateModel;

      return {
        ...parsedStorage,
      activeTask:null,
      secondsRemaining:0,
      formattedSecondsRemaining:'00:00'
      }
    });
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
localStorage.setItem('state',JSON.stringify(state))

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
import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';



 import { MainTemplate } from '../../templades/MainTemplate';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../Contexts/TaskContext/TaskAction';
 




 export function Setting() {

  useEffect(()=>{
      document.title = 'Settings - Chronos Pomodoro'
    },[]);

     const {state,dispatch} = useTaskContext()
     const workTimeInput = useRef<HTMLInputElement >(null); 
     const shortBreakTimeInput= useRef<HTMLInputElement >(null); 
     const longBreakTimeInput = useRef<HTMLInputElement >(null); 

  function handleSaveSettings(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  showMessage.dismiss()

  const formError = []
  const workTime = Number(workTimeInput.current?.value);
  const shortBreakTime = Number(shortBreakTimeInput.current?.value);
  const longBreakTime = Number(longBreakTimeInput.current?.value);

if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)){
  formError.push('Digite Somente números')
  
}

if(workTime < 1 || workTime > 99){
  formError.push('escolha o tempo entre 1 a 99mn para o foco')
}

if(shortBreakTime < 1 || shortBreakTime > 30){
  formError.push('escolha o tempo entre 1 a 30mn para o descanso curto')
}

if(longBreakTime < 1 || longBreakTime > 60){
  formError.push('escolha o tempo entre 1 a 60mn para o descanso longo')
}

if(formError.length > 0){
  formError.forEach(error => {
 showMessage.error(error)
  });
  return;
}
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.sucess('Configurações salvas');

  }

   return (
     <MainTemplate>

       <Container>
        <Heading>Configurações</Heading>
       </Container>

       <Container>
        <p style={{textAlign:'center'}}>Modifique as configurações de foco,descanso curto e descanso longo
        </p>
       </Container>

       <Container>
       <form onSubmit={handleSaveSettings} action="" className="from">
        <div className="formRow">
          <DefaultInput id='workTime' labelText='foco' ref={workTimeInput} defaultValue={state.config.workTime} type='number'/>
        </div>

         <div className="formRow">
          <DefaultInput id='shortBreakTime' labelText='Descanso curto' ref={shortBreakTimeInput} defaultValue={state.config.shortBreakTime} type='number'/>
        </div>

         <div className="formRow">
          <DefaultInput id='longoBreakTime' labelText='descanso longo' ref={longBreakTimeInput} defaultValue={state.config.longBreakTime} type='number'/>
        </div>

        <div className="formRow">
          <DefaultButton icon={<SaveIcon/>} aria-label='salva configurações' title='salva configurações'/>
        </div>
       </form>
       </Container>
    </MainTemplate>
      
 
   
   );
 }
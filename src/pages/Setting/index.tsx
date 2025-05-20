import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';



 import { MainTemplate } from '../../templades/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
 




 export function Setting() {
     const {state} = useTaskContext()
     const workTimeInput = useRef<HTMLInputElement >(null); 
     const shortBreakTimeInput= useRef<HTMLInputElement >(null); 
     const longoBreakTimeInput = useRef<HTMLInputElement >(null); 

  function handleSaveSettings(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  const workTime = workTimeInput.current?.value;
  const shortBreakTime = shortBreakTimeInput.current?.value;
  const longoBreakTime = longoBreakTimeInput.current?.value;

  console.log(workTime,shortBreakTime,longoBreakTime)
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
          <DefaultInput id='workTime' labelText='foco' ref={workTimeInput} defaultValue={state.config.workTime}/>
        </div>

         <div className="formRow">
          <DefaultInput id='shortBreakTime' labelText='Descanso curto' ref={shortBreakTimeInput} defaultValue={state.config.shortBreakTime}/>
        </div>

         <div className="formRow">
          <DefaultInput id='longoBreakTime' labelText='descanso longo' ref={longoBreakTimeInput} defaultValue={state.config.longBreakTime}/>
        </div>

        <div className="formRow">
          <DefaultButton icon={<SaveIcon/>} aria-label='salva configurações' title='salva configurações'/>
        </div>
       </form>
       </Container>
    </MainTemplate>
      
 
   
   );
 }
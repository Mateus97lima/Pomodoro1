import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';



 import { MainTemplate } from '../../templades/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
 




 export function Setting() {
     const {state} = useTaskContext()
     const workTimeInput = useRef<HTMLInputElement >(null); 
     const shortBreakTimeInput= useRef<HTMLInputElement >(null); 
     const longoBreakTimeInput = useRef<HTMLInputElement >(null); 

  function handleSaveSettings(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  showMessage.dismiss()

  const formError = []
  const workTime = Number(workTimeInput.current?.value);
  const shortBreakTime = Number(shortBreakTimeInput.current?.value);
  const longoBreakTime = Number(longoBreakTimeInput.current?.value);

if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longoBreakTime)){
  formError.push('Digite Somente números')
  
}

if(workTime < 1 || workTime > 99){
  formError.push('escolha o tempo entre 1 a 99mn para o foco')
}

if(shortBreakTime < 1 || shortBreakTime > 30){
  formError.push('escolha o tempo entre 1 a 30mn para o descanso curto')
}

if(longoBreakTime < 1 || longoBreakTime > 60){
  formError.push('escolha o tempo entre 1 a 60mn para o descanso longo')
}

if(formError.length > 0){
  formError.forEach(error => {
 showMessage.error(error)
  });
  return;
}
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
          <DefaultInput id='longoBreakTime' labelText='descanso longo' ref={longoBreakTimeInput} defaultValue={state.config.longBreakTime} type='number'/>
        </div>

        <div className="formRow">
          <DefaultButton icon={<SaveIcon/>} aria-label='salva configurações' title='salva configurações'/>
        </div>
       </form>
       </Container>
    </MainTemplate>
      
 
   
   );
 }
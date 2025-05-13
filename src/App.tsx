


import './styles/theme.css'
import './styles/global.css'




import { TaskContextProvider } from './Contexts/TaskContext/TaskContextProvider';

import { MessageContainer } from './components/MessageContainer';
import { MainRouters } from './Routers/MainRouters';





export function App(){
  
  return (
    <TaskContextProvider>
  <MessageContainer>
<MainRouters/>
  </MessageContainer>
   </TaskContextProvider>
    
  )
}

 
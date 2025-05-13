 
import { RouterLink } from '../RoutLinks';
import styles from './styles.module.css'
 


 export function Footer () {
    
  
    return (
       <footer className={styles.foot}>
        <RouterLink href="/About-Pomodoro/">Entenda como funciona a técnica de Pomodoro 🍅 </RouterLink>
        <RouterLink href="/">Chronos Pomodoro &copy;{new Date().getFullYear()} - feito com 💙</RouterLink>
       </footer>
    ); 
}
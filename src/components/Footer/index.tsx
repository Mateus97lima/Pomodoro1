 
import styles from './styles.module.css'
 


 export function Footer () {
    
  
    return (
       <footer className={styles.foot}>
        <a href="#">Entenda como funciona a técnica de Pomodoro 🍅 </a>
        <a href="#">Chronos Pomodoro &copy;{new Date().getFullYear()} - feito com 💙</a>
       </footer>
    ); 
}
 
import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css'
import { RouterLink } from '../RoutLinks';
 


 export function Logo () {
    
  
    return (
        <div className={styles.logo}>
            <RouterLink className={styles.logoLink} href="#">
                <TimerIcon/>
                <span>Chronos</span>
            </RouterLink>
        </div>
    ); 
}
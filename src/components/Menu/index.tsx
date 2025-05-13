 
import { HistoryIcon, HomeIcon, MoonIcon, Settings,  SunIcon } from 'lucide-react';
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
 
type AvalibTheme = 'Dark'  | 'light'



 export function Menu () {
    
   const [theme,setTheme] = useState <AvalibTheme> (()=>{
      const storageTheme = (localStorage.getItem('theme') as AvalibTheme) || 'Dark';
      
      return storageTheme;
   })
   const nextIcon = {
      Dark:<SunIcon/>,
      light:<MoonIcon/>,
   };

   function handletheme (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      event.preventDefault();


   setTheme(prevTheme =>{
      const nexTheme =prevTheme === 'Dark' ? 'light': 'Dark'
      
      return nexTheme;
   });

   };
   useEffect(()=>{
     document.documentElement.setAttribute('data-theme',theme)
     localStorage.setItem('theme',theme);
   },[theme]);
   
   
  
    return (
        <nav className={styles.menu}>
         
         <a className={styles.menuLink} href="#" aria-label='ir para home' title='ir para home'>
            <HomeIcon/>
         </a>

         <a className={styles.menuLink} href="#" aria-label='Ver historico' title='Ver historico'>
            <HistoryIcon/>
         </a>

         <a className={styles.menuLink} href="#" aria-label='Ir pras Configuranções' title='Ir pras Configuranções'>
            <Settings/>
         </a>

         <a className={styles.menuLink} href="#" aria-label='Mudar tema' title='Mudar tema' onClick={handletheme}>
            {nextIcon[theme]}
         </a>
        </nav>
    ); 
}
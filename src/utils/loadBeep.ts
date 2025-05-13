import graver from '../assets/audios/wake-up-will-you-446.ogg';

export function loadBeep () {
  const audio = new Audio(graver)  
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(erro => console.log('erro no audio',erro));
  }
}
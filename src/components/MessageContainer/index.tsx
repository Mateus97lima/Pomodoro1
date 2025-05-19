import { Bounce, ToastContainer } from "react-toastify";

type MessageContainerProps ={
children:React.ReactNode;
}


export function MessageContainer({children}:MessageContainerProps){
    return(
        <>
   {children}

             <ToastContainer
position="top-center"
autoClose={10000} //carrega aquela barrinha de tempo//
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}// clica e fecha//
rtl={false}
pauseOnFocusLoss
draggable // arrasta pro lado e sumi a barra//
pauseOnHover
theme="light"
transition={Bounce}
/> 
</>
    )
}
'use client'
import {  Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface IFromContext {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>
    onHandleNext : () => void
    onHandleBack : () => void
    step : number
    
}
const FormContext = createContext<IFromContext>({
    formData: {},
    setFormData: () => {},
    onHandleNext : () => {},
    onHandleBack : () => {},
    step : 0,
})


interface IProps{
    children : ReactNode
}
export function FormProvider({children}: IProps) {
    const [formData, setFormData] = useState();
    const [step , setStep] = useState(1)
    

    function onHandleNext(){
        setStep((prev) => prev + 1)
    }

    function onHandleBack(){
        setStep((prev) => prev - 1)
        
    }

    return <FormContext.Provider value={{formData, setFormData , onHandleBack,onHandleNext,step}}
    >{children}</FormContext.Provider>
}

export function useFormState(){
    return useContext(FormContext);
}
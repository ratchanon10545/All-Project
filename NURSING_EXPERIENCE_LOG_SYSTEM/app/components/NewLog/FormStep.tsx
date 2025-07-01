'use client'
import { Page1 }  from "@/app/components/NewLog/page1";
import { useFormState } from "./FormContext";
import { Page2 } from "@/app/components/NewLog/page2";
import { Page3 } from "@/app/components/NewLog/page3";
import Page4 from "./page4";

interface Props {
  title?: any 
  place?: any 
  approver?: any 
  session : any
}

export function FormStep({
    title,
    place,
    approver,
    session
  }: Props) {
    const {step,onHandleNext} = useFormState()

    switch(step){
      case 1 :
        return <Page1 data={title}/>
      case 2 :
        return <Page2
        data={place}
      />
      case 3 :
        return <Page3
        data={approver}
      />
      case 4 :
        return <Page4
              data={title}
              session = {session}
              />
      
    }
}
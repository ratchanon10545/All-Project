"use client"

import LiveSearch from "@/app/components/LiveSearch";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
import { useRouter } from "next/navigation";
import { Text } from "@radix-ui/themes";

interface Props {
  data?: any;
}

type Inputs = {
  type: number
}

const listtype = [
  {id : 1 , type: "ภายใน"},
  {id : 0 , type: "ภายนอก"}
]

const App2  = <T extends object>({
   data
  }: Props ): JSX.Element =>  {
    const {onHandleNext,onHandleBack ,setFormData ,formData} = useFormState()
    const [selectedOption, setSelectedOption] = useState<Number>();
    
    const [type2,setType2] = useState<string | undefined>()

    const [results, setResults] = useState<{ id: string; name: string }[]>();
    const [selectedProfile, setSelectedProfile] = useState<{
      id?: string | null;
      name?: string | null;
    }>({id:formData.Aid,name:formData.ApproverName});
    const [results2, setResults2] = useState<{ id: string; name: string }[]>();
    
    const [errors,setErrors] = useState("")
    // setResults(profiles)

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
      const { target } = e;
      const filteredValue = results2?.filter((data: { name: string; }) =>
        data.name.toLowerCase().includes(target.value)
      );
      setResults(filteredValue);
    };

    type clickHandler = React.MouseEventHandler<HTMLInputElement>;
    const handleClick:clickHandler = (e) => {
        setErrors("")
        
        if (selectedOption !== null){
          const dt = data.filter((x:{type: number}) => x.type === selectedOption)
          setResults(dt)
          setResults2(dt)
          setType2(selectedOption?.toString())
        }
        else{
          setResults(data)
          setResults2(data)
        }
        
    };

    const handleOptionChange = (id : any) => {
      const _id = parseInt(id)
      setSelectedOption(_id);
      setSelectedProfile({
        id : null,
        name: null
      })
    };

    const {register,handleSubmit} = useForm<Inputs>({
      defaultValues : formData
    })
    

    const onSubmit: SubmitHandler<Inputs> = (data) =>{
      const Aid = selectedProfile?.id
      const ApproverName = selectedProfile?.name
      
      if(Aid === undefined || Aid === null){
        setErrors("กรุณากรอกชื่อผู้นิเทศ")
      }
      else{
        setFormData((prev: any) => ({ ...prev, ...data,Aid,ApproverName,type2}));
        onHandleNext()
        
      }

      
    }
    const rounter = useRouter()

    const onCancel =() => {
          rounter.push("/Home")
    }

   
    return (
      <div className="flex items-center justify-center p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div><label>ผู้นิเทศ</label></div>
          <div className="py-5">
          
              {listtype.map((type,index) =>{
                return(
                  <div key={index} className=" flex items-center">
                    <input id={type.id.toString()} type="radio" value={type.id} {...register('type')}
                      onChange={(e) => handleOptionChange(e.target.value)}
                      checked={selectedOption === type.id}
                      className="w-7 h-7 "
                    ></input>
                    <label htmlFor={type.id.toString()} className="p-2">{type.type}</label>
                  </div>
                )
              })}
          </div>
          <div className="py-5">
          <LiveSearch
              results={results}
              value={selectedProfile?.name}
              renderItem={(item) => <p>{item.name}</p>}
              onChange={handleChange}
              onSelect={(item) => setSelectedProfile(item)}
              onClick={handleClick} 
          />
          </div>
          <div>
            {errors ? 
              <Text color="red">{errors}</Text>
            : null}
          </div>
          <div className="flex gap-24 justify-end py-5">
                <button
                type="button"
                onClick={onHandleBack}
                className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
              >
                กลับ
              </button>
              <button className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                ถัดไป
              </button>
          </div>
          <div className="flex justify-center p-5">
                    <button className="h-11 px-6 inline-block bg-red-600 font-semibold text-white rounded-md"
                    type="button"
                    onClick={onCancel}
                    >
                        ยกเลิก
                    </button>
          </div>
        </div>
        </form>
      </div>
    );
  };
  
  export default App2;
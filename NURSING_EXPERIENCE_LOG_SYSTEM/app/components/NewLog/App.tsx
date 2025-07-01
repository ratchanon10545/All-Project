"use client"

import LiveSearch from "@/app/components/LiveSearch";
import { useEffect, useState } from "react";
import { useFormState } from "./FormContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Text } from "@radix-ui/themes";

interface Props {
  data?: any;
 
}

type Inputs = {
  placeother: string
  wardother: string
  bed: string
}

const App  = <T extends object>({
   data,
   
  }: Props ): JSX.Element =>  {
    const {onHandleNext,onHandleBack,setFormData , formData } = useFormState()

    const place = data.place
    const ward = data.ward

    const [results, setResults] = useState<{ id: number; Place: string }[]>();
    const [selectedProfile, setSelectedProfile] = useState<{
      id?: number | null;
      Place?: string | null;
      
    }>({id:formData.PlaceId,Place : formData.Place});
    const [errorplace,setErrorplace] = useState("")

    const [listward, setListWard] = useState<{ id: number; ward: string }[]>();
    const [listwardslected, setListWardselected] = useState<{ id: number; ward: string }[]>();
    const [selectedWard, setSelectedWard] = useState<{
      id?: number | null ;
      ward?: string | null;
    }>({ward : formData.Ward});
    // setResults(profiles)
    const [errorward,setErrorward] = useState("")

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
      const { target } = e;
      const filteredValue = place.filter((place: { Place: string; }) =>
        place.Place.toLowerCase().includes(target.value)
      );
      setResults(filteredValue);
    };

    type clickHandler = React.MouseEventHandler<HTMLInputElement>;
    const handleClick:clickHandler = (e) => {
        setResults(place)
        setErrorplace("")
        setSelectedProfile({
          id : null,
          Place: null
        })
    };

    // console.log(selectedProfile?.Place)
    const handleClick2:clickHandler = (e) => {
      const dt = ward.filter((x:{placeid: number}) => x.placeid === selectedProfile?.id)
      setListWard(dt)
      setListWardselected(dt)
      setErrorward("")
      setSelectedWard({
        id : null,
        ward: null
      })
    };
    const handleChange2: changeHandler = (e) => {
      const { target } = e;
      // if (!target.value.trim()) return setListWard([]);
      const filteredValue = listwardslected?.filter((ward: { ward: string; }) =>
        ward.ward.toLowerCase().includes(target.value)
      );
      setListWard(filteredValue);
    };

    const {register,handleSubmit} = useForm<Inputs>({
      defaultValues:formData
    }
    )
    

    const onSubmit: SubmitHandler<Inputs> = (data) =>{
      // console.log(data,{selectedProfile},{selectedWard})
      const PlaceId = selectedProfile.id
      const Place = selectedProfile?.Place
      const Ward = selectedWard?.ward 
      
      if(Place === undefined || Place === null){
        setErrorplace("กรุณากรอกสถานที่")
      }
      else if (Ward === undefined || Ward === null){
        setErrorward("กรุณากรอกหอผู้ป่วย")
      }
      else{
        setFormData((prev: any) => ({ ...prev, ...data,PlaceId,Place,Ward}));
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
        <div className="relative ">
          <div className="py-5">
          <div><label>เลือกสถานที่ฝึกประสบการณ์</label></div>
          <LiveSearch
              results={results}
              value={selectedProfile?.Place}
              renderItem={(item) => <p>{item.Place}</p>}
              onChange={handleChange}
              onSelect={(item) => setSelectedProfile(item)}
              onClick={handleClick}
          />
          </div>
          <div>
            {errorplace ? 
              <Text color="red">{errorplace}</Text>
            : null}
          </div>
          <div className="py-5">
            <div><label>กรณีอื่น ๆ โปรดระบุ</label></div>
            <input
              type="text"
              className={selectedProfile?.Place === 'อื่นๆ'?
              "w-auto px-5 py-3 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition":
              "w-auto px-5 py-3 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition bg-slate-300"}
              {...register('placeother')}
              readOnly={selectedProfile?.Place === 'อื่นๆ' ? false:true}
              
            />
          </div>
          <div className="py-5">
            <div><label>หอผู้ป่วย (ward)</label></div>
            <LiveSearch
                results={listward}
                value={selectedWard?.ward}
                renderItem={(item) => <p>{item.ward}</p>}
                onChange={handleChange2}
                onSelect={(item) => setSelectedWard(item)}
                onClick={handleClick2}
          />
          </div>
          <div>
            {errorward ? 
              <Text color="red">{errorward}</Text>
            : null}
          </div>
          <div className="py-5">
            <div><label>กรณีอื่น ๆ โปรดระบุ</label></div>
            <input
              type="text"
              className={selectedWard?.ward === 'อื่นๆ' ? "w-auto px-5 py-3 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition":
              "w-auto px-5 py-3 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition bg-slate-300"}
              {...register('wardother')}
              readOnly={selectedWard?.ward === 'อื่นๆ' ? false:true}
            />
          </div>
          <div className="py-5">
          <div><label>เตียง</label></div>
            <input
              type="text"
              className="w-auto px-5 py-3 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition"
              {...register('bed')}
            />
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
  
  export default App;
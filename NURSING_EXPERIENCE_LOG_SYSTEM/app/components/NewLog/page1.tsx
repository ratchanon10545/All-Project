import React from 'react'
// import axios from "axios";
// import config from '@/app/config';
import Dropdown from '@/app/components/NewLog/dropdown';
import { FormProvider } from '@/app/components/NewLog/FormContext';

interface Props {
    data?: any ;
  }

export function Page1({
    data
    }:Props) {
    // const titles = await axios.get(`${config.apiUrl}/api/dataskills`)
    // console.log(titles.data.main)
    // console.log(titles.data.sub)

    return (
        <div>
                <Dropdown
                    data={data}
                />
        </div>
  )
}


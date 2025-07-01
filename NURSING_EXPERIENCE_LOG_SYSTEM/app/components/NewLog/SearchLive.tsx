'use client'
import React, { useState } from 'react'
import App from '@/app/components/NewLog/App';
import App2 from '@/app/components/NewLog/App2';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from '@radix-ui/themes';

interface Props {
    place?: any;
  }

type Inputs = {
    place: string
    ward: string
 }

const Search = ({
    place
}:Props) => {

  return (
    <div>
      <App
        data={place}
      />
    </div>
  )
}

export default Search
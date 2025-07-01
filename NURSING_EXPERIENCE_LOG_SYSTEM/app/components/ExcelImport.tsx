'use client'
import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from 'next/navigation'

export default function MyNextJsExcelSheet({pathApi}:any) {
    const router = useRouter()
const [items, setItems] = useState([]);
const readExcel = (file: Blob) => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e : any) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer",
                cellDates:true
            });
            
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            // console.log(data);
            resolve(data);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    promise.then(async (d : any) => {
        
        await axios.post(pathApi,d)
        router.refresh()
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
            if(e.target.files){
                const file = e.target.files[0];
                readExcel(file);
            }
          
        }}
      />
      </div>
  );
}
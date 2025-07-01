"use client"
import React from "react";
import { ColorRing } from 'react-loader-spinner'
export default function Loading() {
   
    return (
        <div className="mt-10">
            <div className="flex justify-center">
                <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#C54C02','#CB4D00', '#CB4D00', '#757474', '#ADADAD']}
                />
            </div>
            <div className="flex justify-center">
                <h2 className="text-gray-700 text-xl font-bold">กำลังโหลด...</h2>
            </div>
            <div className="flex justify-center">
                <p className="text-gray-600">กรุณารอสักครู่</p>
            </div>
        </div>
        
    )
}
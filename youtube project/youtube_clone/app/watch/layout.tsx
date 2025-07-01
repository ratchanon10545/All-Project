import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


import { ReactNode } from 'react';

function layout({children}: {children: ReactNode}) {
  return (
    <div className="bg-white">
          <Header />
          <div className="flex">
            <main className="ml-20 p-4 w-full mt-24">
            {children}
            </main>
          </div>
        </div>
  )
}

export default layout
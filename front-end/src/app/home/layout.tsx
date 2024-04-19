"use client"
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import React, { useState } from 'react'
import { Inter } from "next/font/google";
import { theme } from '../../../theme';
import Navbar from '@/components/big-components/navbar/Navbar';
import TopBar from '@/components/big-components/TopBar/TopBar';

const inter = Inter({ subsets: ["latin"] });

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    const toggleSideBar = ()=>{
      setIsSideBarOpen(!isSideBarOpen);
    }
  return (
    <>
    <TopBar toggleSideBar={toggleSideBar} />
    <div className='flex relative'>
    <Navbar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar}/>
    <div className='w-full h-[calc(100vh-57px)]'>{children}</div>
    </div>
    </>
  )
}

"use client"
import { Badge, Button, Modal, Select, Text, TextInput, Textarea } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import style from "./daily-goal.module.css"

type HabbitType = "TimeWasters" | "Productive";

export default function page() {
  const [opened, { open, close }] = useDisclosure(false);
  


  let data = [{
    name:"First Habbit",
    description:"Just making sire that data which will populate will be good ",
    date:"12-March-24",
    time:"12:23 PM",
    habbitType:"Productive"

  },
  { 
    name:"Second Habbit",
    description:"Just making sire that data which will populate will be good ",
    date:"12-March-24",
    time:"12:23 PM",
    habbitType:"Timewaste"

  }]

 
  return (
    <div>
      <div className='m-4 flex justify-between'>
        <p className='text-2xl font-semibold'>Daily Goals</p>
        <p>
           <Button variant="filled" className={style.addHabbit} onClick={open}>Add Habbit</Button>
        </p>
      
      </div>
      <div>
        <p className='m-4 text-sm font-medium'>12-March-24</p>
      </div>
      <div>
        {
          data?.map((ele,ind)=>{  
            return <div className='border-2 border-solid m-4 p-2 cursor-pointer' key={ind}>
                <div className='flex justify-between'>
                   <p className='font-medium'>{ele.name}</p><p className='text-xs'>{ele.time}</p>
                </div>
                <div className='text-slate-500'>
                  {ele.description}
                </div>
                <div className='flex justify-between text-xs'>
                  <p>{ele.date}</p> <Badge color={ele.habbitType=='Productive'?"green":"red"}>{ele.habbitType}</Badge>
                </div>
                
              </ div>
          })
        }

      </div>
     
      <Modal opened={opened} onClose={close} title="Add Habbit" className='font-semibold' centered overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <TextInput
          label="Name"
          required
          placeholder="Enter the habbit name"
        />
         <Textarea
          label=" Description"
          placeholder="Enter the description"
        />
         <TimeInput
          label="Time"
          required
          placeholder="Enter time"
        />
        <Select
          label="Type of habbit"
          placeholder="Pick type of habbit"
          data={['Productive', 'TimeWasters']}
          required
        />
        <Button fullWidth  className={`mt-2 ${style.addHabbit}`}>Add</Button>
      </Modal>

    </div>
  )
}
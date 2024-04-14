"use client"
import { Alert, Badge, Button, Checkbox, Modal, Progress, Select, Table, Text, TextInput, Textarea } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import style from "./daily-goal.module.css"
import moment from 'moment';
import { deleteHabbit, getDailyHabbits, postDailyHabbit } from '@/services/dailyhabbit.service';
import { type } from 'os';
import { IconInfoCircle } from '@tabler/icons-react';

type HabbitType = "TimeWasters" | "Productive";


export default function page() {

  const [date,setDate] = useState<number>(moment().startOf('day').unix());
  const [name,setName] = useState<string>("");
  const [description,setDescription] = useState<string>("")
  const [startDate,setStartDate] = useState<string>("");
  const [typeOfHabit,setTypeOfHabit] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [habits,setHabit] = useState<any>([]);

  useEffect(()=>{
    getDailyHabbit()
  },[date])

  const markTaskDone = async(element:any) =>{
    element.done = element?.done!=undefined?!element.done:true;
    
  }

  const deleteHabbitClicked = async(element:any)=>{
    let payload= {
      date__type:element.date__type
    }
    try{
      await deleteHabbit(payload);
      await getDailyHabbit()
    }
    catch(err){
      console.log("err",err)
    }
  }
  
  const getDailyHabbit = async() =>{
    let data:any = await getDailyHabbits(date);
    setHabit(data.data)
  }

  const submitForm =async ()=>{
    let payload = {
      name : name,
      description:description,
      startDate:startDate,
      typeOfHabit:typeOfHabit
    }
     try{
      await postDailyHabbit(payload);
      await getDailyHabbit();
      close();
     }catch(e:any){
      <Alert variant="light" color="blue" title="Alert title" icon={<IconInfoCircle/>}>
          {
            e?.msg!=""?e.msg:"Don;e knoow"
          }
    </Alert>
     }
  }
  

  


  let data = [{
    name:"First Habbit",
    description:"Just making sire that data which will populate will be good ",
    date:"12-March-24",
    time:"12:23 PM",
    habbitType:"Productive",
    done:true,

  },
  { 
    name:"Second Habbit",
    description:"Just making sire that data which will populate will be good ",
    date:"12-March-24",
    time:"12:23 PM",
    habbitType:"Timewaste",
    done:false
  }]

  const rows = habits?.map((element:any) => (
    <Table.Tr key={element.name}
      bg={element.done ? 'var(--mantine-color-blue-light)' : undefined}
      
      >
      <Table.Td>
        <Checkbox
          onClick={()=>markTaskDone(element)}
          checked={element.done}
        />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{moment.unix(element.startDate).format("DD MMM YY, HH:mm")}</Table.Td>
      <Table.Td>{element.typeOfHabit}</Table.Td>
      <Table.Td>
        <Button variant="filled" color="red" size='xs' onClick={()=>deleteHabbitClicked(element)}>Delete</Button>
      </Table.Td>
    </Table.Tr>
  ));
 
  return (
    <div>
      <div className='m-4 flex justify-between'>
        <p className='text-2xl font-semibold'>Daily Goals</p>
        <p>
           <Button variant="filled" className={style.addHabbit} onClick={open}>Add Habbit</Button>
        </p>
      
      </div>
      <div className='flex justify-between'>
        <div className='ml-4 w-full text-sm font-medium'>12-March-24</div>
        <div className='w-full flex items-center mr-4 justify-end text-sm gap-7 font-medium'>
          <Progress color="green" radius="md" className='w-32' value={30} />
          20% Done
        </div>
      </div>
      <div>
      <Table.ScrollContainer minWidth={500} type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      </div>
     
      <Modal opened={opened} onClose={close} title="Add Habbit" className='font-semibold' centered >
        <TextInput
          label="Name"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Enter the habbit name"
        />
         <Textarea
          label=" Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Enter the description"
        />
         <TimeInput
          label="Starting Time"
          required
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
          placeholder="Enter time"
        />
       
        <Select
          label="Type of habbit"
          placeholder="Pick type of habbit"
          data={['Productive', 'TimeWasters']}
          required
          value={typeOfHabit}
          onChange={(e)=>setTypeOfHabit(e as string)}
        />
        <Button fullWidth  className={`mt-2 ${style.addHabbit}`} onClick={()=>submitForm()}>Add</Button>
      </Modal>

    </div>
  )
}

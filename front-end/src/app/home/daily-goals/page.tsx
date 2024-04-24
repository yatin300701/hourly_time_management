"use client"
import { Badge, Button, Card, Chip, Group, Input, LoadingOverlay, Modal, Text, TextInput, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Form, hasLength, useForm } from '@mantine/form';
import { DateInput, DateTimePicker, TimeInput } from '@mantine/dates';
import { postDailyHabbit , getDailyHabbits, deleteHabbit, updateDailyHabbit} from '@/services/dailyhabbit.service';
import moment from 'moment';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface HabitcardData{
  date: number;
  accountId: string;
  status: string;
  date__type: string;
  createdAt: number;
  name: string;
  type: string;
}

export default function page() {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState(new Date())
  const [habitList,setHabitList] = useState([]);

  useEffect(()=>{
    getAllDailyHabits();
  },[])

  const closeHabitModal = () =>{
    close();
  }
  const getAllDailyHabits = async () =>{
    try{
      
      let data = await getDailyHabbits(date);;
      setHabitList(data.data);
    }catch(err){
      console.log("err iss ", err)
    }
  }



  return (
    <div>
      <div className='flex justify-between items-center m-[14px]'>
        <div className='text-[18px] font-semibold'>Daily Habbits</div>
        <div><Button variant="filled" onClick={open}>Add</Button></div>
      </div>
      <div className='m-[14px]'>
          <div>{moment(date).format("DD-MMM")}</div>
          <hr/>
          <div className='flex flex-col md:hidden'>
              {
                React.Children.toArray(habitList.map((ele:any)=>{
                return <>
                   <HabitCard data={ele}  loadAllHabits={getAllDailyHabits}/>
                </>}))
              }
          </div>
      </div>


    <HabitModal opened={opened} close={()=>closeHabitModal()} loadAllHabits={getAllDailyHabits}/>
      
    </div>
  )
}



function HabitModal(props:{data?:any,opened:boolean,close:()=>void,loadAllHabits:()=>{}}){
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: props.data == undefined ?  { name: '',description:'', type:'Today',date:'' }:
    {name:props.data.name,description:props.data.description,type:props.data.type,date:props.data.date!=undefined ?  new Date(props.data.date*1000) : ""} ,
    validate: {
      name: hasLength({ min: 1 }, 'Name is required field'),
      date:(value:any,values:any)=>{
        if(values.type=="Custom" && !value) return "Date is required field";
        return undefined;
      }
    },
  });

  const addHabit= async (data:{
    name: string;
    description: string;
    type: string;
    date: string|Date;
})=>{
    try{
      toggle();
      if(props.data!=undefined){
        let payload = {
          accountId:props.data.accountId,
          name:data.name,
          description:data.description,
          type:data.type,
          date:data.date,
          status:"In-Progress",
          date__type:props.data.date__type,
          createdAt:props.data.createdAt
        }
        await updateDailyHabbit(payload);
      }else{
        await  postDailyHabbit(data);
      }
      props.loadAllHabits();
      toggle();
      form.reset();
     props.close();
    }catch(err){
      toggle()
      console.log(err);
    }
    
  }

  return <>
  <Modal opened={props.opened} onClose={props.close} title="Add Habit" centered style={{position:"absolute"}}>
    <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    <form onSubmit={form.onSubmit((data)=>addHabit(data))}>
        <TextInput placeholder="Type name" withAsterisk label="Name" {...form.getInputProps('name')} />
        <Textarea
        {...form.getInputProps('description')}
          label="Description"
          placeholder="Type description"
        />
        <Chip.Group  {...form.getInputProps('type')}>
          <Group style={{margin:"10px 0px"}}>
            <Chip  radius="xs" value="Today">Today</Chip>
            <Chip radius="xs" value="Custom">Custom</Chip>
          </Group>
        </Chip.Group>
        {
          form.getInputProps('type').value == "Custom" &&  <DateInput
          {...form.getInputProps('date')}
          withAsterisk
          label="Date"
          placeholder="Select date"
        />
        }
        <Group justify="center" grow mt="md">
          <Button type="submit">Submit</Button>
        </Group>

        </form>
      </Modal></>
}

const DeleteModel = (props:{data?:any,opened:boolean,close:()=>void,loadAllHabits:()=>{}}) =>{
  const [visible, { toggle }] = useDisclosure(false);

  const deleteHabbitClicked = async (data:any) =>{
    try{
      toggle();
      console.log("props", props)
      
      await deleteHabbit({date__type:props.data.date__type});
      await props.loadAllHabits();
      toggle();
      props.close();
    }catch(err){
      toggle()
      console.log(err);
    }
  
  }
  return <>
   <Modal opened={props.opened} onClose={props.close} title="Delete Habbit" centered style={{position:"absolute"}}>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Group justify="center" grow mt="md">
          <Button type="submit" color="red" onClick={()=>deleteHabbitClicked(props.data)}>Submit</Button>
      </Group>
  </Modal>
  </>
}

const HabitCard = (props:{data:{ date: number|number;
  accountId: string;
  status: string;
  date__type: string;
  createdAt: number;
  name: string;
  type: string;},loadAllHabits:()=>{}}) =>{
  let tagColor:any = {
    'To-Do':'grey',
    'In-Progress':'blue',
    'Done':'green'
  }
  const [openedEditModal, { open:openEditModal, close:closeEditModel }] = useDisclosure(false);
  const [openedDelete,{open:openDeleteModel,close:closeDeleteModal}] = useDisclosure(false);
return <>
  <Card shadow="sm" padding="lg" radius="12px" withBorder className='text-sm my-[10px] text-[#494949]'>
                  <div className='flex justify-between pb-[7px]'>
                    <Text className='text-base font-medium '>{props.data.name}</Text>
                    <Badge color={tagColor[props.data.status]}>{props.data.status}</Badge>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-[#696969]'>{props.data.type}</div>
                    <div className='flex gap-1 pr-[6px]'>
                      <IconEdit className='w-[20px]' onClick={()=>openEditModal()} />
                      <IconTrash className='text-[red] w-[20px]' onClick={openDeleteModel}/>
                    </div>
                  </div>
    </Card>
    <HabitModal data={props.data} opened={openedEditModal} close={closeEditModel} loadAllHabits={props.loadAllHabits}/>
    <DeleteModel data={props.data} opened={openedDelete} close={closeDeleteModal}  loadAllHabits={props.loadAllHabits}/>

  </>
}
import {
  IconNotes,
  IconGauge,
  IconHomeFilled,
  IconRadarFilled,
  IconSquareRoundedCheckFilled,
  IconUserFilled,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/home' },
      { label: 'Forecasts', link: '/exrea' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
]

export default function Navbar(props:{isSideBarOpen:boolean,toggleSideBar:()=>void}) {
 

  
  const [activeTab,setActiveTab] = useState('DailyGoals');
  const router = useRouter()

  const handleNavigation = (route:string) => {
   
    router.push(route);
    let activeTab:string = "";
    switch(route){
      case '/home':{
        activeTab = "Home";
        break;
      }
      case '/home/daily-goals':{
        activeTab = "DailyGoals";
        break;
      }
      case '/home/long-term-plans':{
        activeTab = "LongTermPlan";
        break;
      }
      case '/home/profile':{
        activeTab = "Profile";
        break;
      }
    }
    console.log("prinyer",activeTab)
    setActiveTab(activeTab);
    props.toggleSideBar()
  };
  return (
    <div className='flex flex-col h-[calc(100vh-60px)] p-y-5 justify-between w-[230px] mr-2.5 shadow-custom max-md:absolute max-md:left-[-230px] bg-white' style={{left:`${props.isSideBarOpen?"0px":"-230px"}`}}>
      <div className='flex flex-col gap-1.5'>
        <div className={`flex items-center gap-4 py-3 px-2.5 text-sm hover:bg-[lightgrey] cursor-pointer`} style={{background:`${activeTab=='Home'?'#eaf5ff':""}`}}  onClick={()=>handleNavigation('/home')}>
          <IconHomeFilled color={`${activeTab=='Home'?'#228BE6':""}`}    stroke={1.5}/>Home
        </div>
        <div  className='flex items-center gap-4 py-3 px-2.5 text-sm hover:bg-[lightgrey] cursor-pointer' style={{background:`${activeTab=='DailyGoals'?'#eaf5ff':""}`}} onClick={()=>handleNavigation('/home/daily-goals')}>
         <IconSquareRoundedCheckFilled style={{color:`${activeTab=='DailyGoals'?'#228BE6':""}`}}  /> Daily Habbits
        </div>
        <div  className='flex items-center gap-4 py-3 px-2.5 text-sm hover:bg-[lightgrey] cursor-pointer' style={{background:`${activeTab=='LongTermPlan'?'#eaf5ff':""}`}}  onClick={()=>handleNavigation('/home/long-term-plans')}>
         <IconRadarFilled color={`${activeTab=='LongTermPlan'?'#228BE6':""}`} /> Long Term Plans
        </div>
        
      </div>
      <div>
        <div  className='flex items-center gap-4 py-3 px-2.5 text-sm hover:bg-[lightgrey] cursor-pointer' style={{background:`${activeTab=='Profile'?'#eaf5ff':""}`}} onClick={()=>handleNavigation('/home/profile')} >
         <IconUserFilled color={`${activeTab=='Profile'?'#228BE6':""}`}/> Profile
        </div>
      </div>
     
      
     
    </div>
  )
}

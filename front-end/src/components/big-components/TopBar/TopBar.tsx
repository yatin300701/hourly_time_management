import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
export default function TopBar(props: { toggleSideBar: () => void; }) {
  const [opened, { toggle }] = useDisclosure();
  const toggleBurger = () =>{
    toggle();
    props.toggleSideBar()
  }
  return (
    <div className="w-full shadow-custom text-[26px] font-black text-[#228BE6] border border-solid  p-2 flex items-center justify-between">
      <div>YashTrek</div>
      <div className='max-md:flex hidden' ><Burger opened={opened} onClick={()=>{toggleBurger()}} aria-label="Toggle navigation" /></div>
    </div>
  )
}

"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TBDLogo from "@/public/TBDLogo.svg"
import { Box, styled } from '@mui/material'
// import Select, { MenuItem } from '../atom/select'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Typography,Theme } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const NavBarText = styled(Box)(({theme}:{theme:Theme})=>({
  fontSize:"14px",
  fontWeight:"600",
  display:"flex",
  cursor:"pointer",
  alignItems:"center",
  ":hover":{
    color:theme.palette.primary.dark
  }
}))

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (  
    <>
    <Box display="flex" sx={{paddingX:"55px",paddingY:"22px",bgcolor:"primary.main"}} position="relative" justifyContent={"space-between"} alignItems={"center"}>
        <Link href={""}>
            <Image src={TBDLogo} width={76} height={34} alt='TBD Logo' priority/>
        </Link>
        <Box display="flex" position="absolute" left="50%" top="50%" gap="50px" fontSize={"14px"} sx={{transform:"translate3d(-50%,-50%,0)"}}>
            <NavBarText>
              CLINIC
              <ArrowDropDownOutlinedIcon/>
            </NavBarText>
            <NavBarText>
              AT-HOME
              <ArrowDropDownOutlinedIcon/>
            </NavBarText>
            <NavBarText>
              ABOUT
            </NavBarText>
            <NavBarText>
              LEARN
            </NavBarText>
            <NavBarText>
              MERCH
              <ArrowDropDownOutlinedIcon/>
            </NavBarText>
        </Box>
        <Box display="flex" gap="12px" alignItems={"center"}>
          <Typography variant='body1' fontSize="14px" bgcolor="primary.light" py="1px" px="10px" borderRadius="12px" sx={{cursor:"pointer"}}>Log in</Typography>
          <Box sx={{
            border:"1px solid",
            padding:"10px",
            borderRadius:"50%",
            cursor:"pointer",
            ":hover":{
              color:"primary.dark",
            }
          }}>
            <ShoppingCartOutlinedIcon fontSize='small' sx={{transform:"scaleX(-1)"}}/>
          </Box>
        </Box>

        <Box>
          
        </Box>


    </Box>

      </>
  )
}

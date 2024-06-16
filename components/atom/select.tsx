"use client";
import { MenuItem as MuiMenuItem, Select as MuiSelect, Theme, styled } from '@mui/material';
import React from 'react'

type SelectProps = {
    children:React.ReactNode;
    value:string;
}



type MenuItemProps = {
    children:React.ReactNode;
    value:string;
}

const StyledSelect = styled(MuiSelect)(({theme}:{theme:Theme})=>({

}))

export default function Select({children,value}:SelectProps) {
  return (
    <StyledSelect value={value}>
        {children}
    </StyledSelect>
  )
}



const StyledMenuItem = styled(MuiMenuItem)(({theme}:{theme:Theme})=>({

}))

export function MenuItem({children,value}:MenuItemProps) {
  return (
    <StyledMenuItem value={value}>
        {children}
    </StyledMenuItem>
  )
}


"use client"
import React from 'react'
import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconNotes,
  IconHome,
  IconUserCircle,
} from '@tabler/icons-react';
import { LinksGroup } from '../LinksGroup/LinkGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';
import classes from './Navbar.module.css';
import imgIcon from "../../../public/favicon_io/android-chrome-512x512.png"
import Image from 'next/image';

const mockdata = [
    { label: 'Home', icon: IconHome },
    {
      label: 'Habbits',
      icon: IconNotes,
      initiallyOpened: true,
      links: [
        { label: 'Daily Goals', link: '/y'},
        { label: 'Long Term Goals', link: '/' },
        { label: 'Analysis', link: '/' },
      
      ],
    },
    {
      label: 'Profile',
      icon: IconUserCircle,
    },
  ];

export default function Navbar() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  return (
    <nav className={classes.navbar}>
    

    <ScrollArea className={classes.links}>
      <div className={classes.linksInner}>{links}</div>
    </ScrollArea>

    <div className={classes.header}>
      <Group justify="center" >
        <Image
          src={imgIcon}
          alt='Company Icon'
          width={90}
          height={60}
        />
      </Group>
    </div>
  </nav>
  )
}

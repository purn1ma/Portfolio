import * as React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  BusinessCenterRounded,
  FolderRounded,
  HomeRounded,
  MailRounded,
  Person4Rounded,
} from '@mui/icons-material'

import useWindowDimensions from '../../hooks/useWindowDimension'

export default function BottomBar() {
  const [value, setValue] = React.useState('')
  const { width } = useWindowDimensions()
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(`/${newValue}`)
  }

  const NAV_STYLES = {
    color: 'var(--purple)',
    borderLeft: '1px solid var(--border)',
  }

  const NAV_BUTTONS = [
    {
      label: 'Home',
      value: '',
      icon: <HomeRounded />,
      style: NAV_STYLES,
    },
    {
      label: 'About',
      value: 'about',
      icon: <Person4Rounded />,
      style: NAV_STYLES,
    },
    {
      label: 'Experience',
      value: 'experience',
      icon: <BusinessCenterRounded />,
      style: NAV_STYLES,
    },
    {
      label: 'Projects',
      value: 'projects',
      icon: <FolderRounded />,
      style: NAV_STYLES,
    },
    {
      label: 'Contact',
      value: 'contact',
      icon: <MailRounded />,
      style: NAV_STYLES,
    },
  ]
  return (
    <BottomNavigation
      sx={{
        width: width,
        background: 'var(--bg-surface)',
        boxShadow: '0 -1px 4px var(--purple-border)',
      }}
      value={value}
      onChange={handleChange}
    >
      {NAV_BUTTONS.map((nav, key) => (
        <BottomNavigationAction
          label={nav.label}
          value={nav.value}
          icon={nav.icon}
          style={nav.style}
          key={key}
        />
      ))}
    </BottomNavigation>
  )
}

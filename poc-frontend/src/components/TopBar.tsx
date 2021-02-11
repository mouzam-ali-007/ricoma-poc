import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import GetDrawerChoices from './topbar/GetDrawerChoices'
import DisplayDesktop from './topbar/DisplayDesktop'
import {
  makeStyles,
  Link,
  MenuItem,
  IconButton,
  Drawer,
  Typography,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
    drawerContainer: {
      padding: '20px 30px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  },
}))

export default function TopBar() {
  const classes = useStyles()
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  })
  const { mobileView } = state
  const handleDrawerClose = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: false }))
  }
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }))
    }
    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())
  }, [])

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }))
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: 'left',
            open: state.drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={{ padding: '10px 15px' }}>
            <GetDrawerChoices />
          </div>
        </Drawer>
        <div>Elsdiyaate</div>
      </Toolbar>
    )
  }

  return (
    <React.Fragment>
      <header>
        <AppBar
          color='transparent'
          position='relative'
          className={classes.header}
        >
          {mobileView ? displayMobile() : <DisplayDesktop />}
        </AppBar>
      </header>{' '}
    </React.Fragment>
  )
}

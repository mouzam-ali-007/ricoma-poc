import React from 'react'

import {
  makeStyles,
  Link,
  MenuItem,
  Toolbar,
  Tooltip,
  Button,
} from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
const useStyles = makeStyles(() => ({
  menuItem: {
    fontFamily: 'helvitica regular',
    fontSize: '22px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  name: {
    fontFamily: 'helvitica bold',
    fontSize: '28px',
    width: '400px',
  },
  icon: {
    fontFamily: 'helvitica regular',
    fontSize: '22px',
    marginLeft: '10%',
    marginRight: '10%',
    '&:hover': {
      backgroundColor: 'rgb(255 ,255,255)',
    },
  },
  menuItemIcons: {
    fontFamily: 'helvitica regular',
    fontSize: '22px',
    marginLeft: '-20%',
    marginRight: '2%',
    '&:hover': {
      backgroundColor: 'rgb(255 ,255,255)',
    },
  },
}))
function DisplayDesktop() {
  const classes = useStyles()
  return (
    <Toolbar>
      <MenuItem className={classes.name}>Lore ipsum</MenuItem>
      <MenuItem className={classes.menuItem}>Trega</MenuItem>
      <MenuItem className={classes.menuItem}> Lireda</MenuItem>
      <MenuItem className={classes.menuItem}>Fohlie</MenuItem>
      <MenuItem className={classes.menuItem}>Krielcw</MenuItem>
      <MenuItem className={classes.menuItem}>Frllowi</MenuItem>
      <MenuItem className={classes.icon}>
        <Tooltip title='Cart'>
          <MenuItem className={classes.menuItemIcons}>
            <ShoppingCartIcon />
          </MenuItem>
        </Tooltip>
        <Tooltip title='Login'>
          <MenuItem className={classes.menuItemIcons}>
            <AccountCircleIcon />
          </MenuItem>
        </Tooltip>
      </MenuItem>
    </Toolbar>
  )
}

export default DisplayDesktop

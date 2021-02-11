import React from 'react'

import { makeStyles, Link, MenuItem } from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles(() => ({
  menuItem: {
    fontFamily: 'helvitica bold',
    fontSize: '18px',
  },
}))
function GetDrawerChoices() {
  const classes = useStyles()
  return (
    <>
      <MenuItem className={classes.menuItem}>Lorem ipsum</MenuItem>
      <MenuItem className={classes.menuItem}>Trega</MenuItem>
      <MenuItem className={classes.menuItem}> Lireda</MenuItem>
      <MenuItem className={classes.menuItem}>Fohlie</MenuItem>
      <MenuItem className={classes.menuItem}>Krielcw</MenuItem>
      <MenuItem className={classes.menuItem}>Frllowi</MenuItem>
      <MenuItem className={classes.menuItem}>
        <ShoppingCartIcon />{' '}
      </MenuItem>
    </>
  )
}

export default GetDrawerChoices

import React, {useState, useEffect} from 'react'

import {
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Badge,
  withStyles 
} from '@material-ui/core'

import AddToCart from '../AddToCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles(() => ({
  menuItem: {
    fontFamily: 'helvitica regular',
    fontSize: '22px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  setMenu:{
     display: 'flex',
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
  const [open, isOpen] = useState(false)
  const [count, setCount] = useState(0)
  
  const handleClick = () =>{
    isOpen(!open)
  }
  const cartProducts = JSON.parse(localStorage.getItem('cart') || '{}' );
   
  useEffect(() => {
    setCount(cartProducts.length)
  }, [cartProducts, cartProducts.length])

   return (
     <Toolbar>
       <MenuItem className={classes.name}>Lorem ipsum</MenuItem>
       <MenuItem className={classes.menuItem}>Trega</MenuItem>
       <MenuItem className={classes.menuItem}> Lireda</MenuItem>
       <MenuItem className={classes.menuItem}>Fohlie</MenuItem>
       <MenuItem className={classes.menuItem}>Krielcw</MenuItem>
       <MenuItem className={classes.menuItem}>Frllowi</MenuItem>
       <MenuItem className={classes.icon}>
         <Tooltip title='Cart'>
           <MenuItem className={classes.menuItemIcons}>
             <StyledBadge badgeContent={cartProducts.length} color='secondary'>
               <ShoppingCartIcon onClick={handleClick} />
             </StyledBadge>
           </MenuItem>
         </Tooltip>
         <Tooltip title='Login'>
           <MenuItem className={classes.menuItemIcons}>
             <AccountCircleIcon />
           </MenuItem>
         </Tooltip>
       </MenuItem>
       <Menu
         id='cart-menu'
         style={{ top: '35px' }}
         open={Boolean(open)}
         onClose={handleClick}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
         transformOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
       >
         {open && <AddToCart />}
       </Menu>
     </Toolbar>
   )
}

export default DisplayDesktop

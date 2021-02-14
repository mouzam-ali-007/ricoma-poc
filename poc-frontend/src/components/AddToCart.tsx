import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent
} from '@material-ui/core';
import Image from '../images/glasses.jpg'; 
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: 345,
    width: "300px",
    padding: '10px'
  },
  media: {
    borderRadius: '10px',
    padding:"10px",
    width: '100px',
    height: 50,
  },
  actionArea:{
    display : 'flex',

  },

  actions:{
    marginLeft: '100px'
  },
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
interface Props {
  _id: string;
  
  image: string;
   name: string;
 details: string;
}

export default function AddToCart() {
  const classes = useStyles();

  const [cartItem, setCartItems] = useState<any[]>([])

  useEffect(() => {
    const cartProducts =JSON.parse(localStorage.getItem('cart') || '{}' );
    setCartItems(cartProducts);
 },[cartItem.length])
 
  const removeItem = (index: number) =>{
    cartItem.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItem));
     
    const newData =JSON.parse(localStorage.getItem('cart') || '{}' );   
    setCartItems(newData);
  }

  return (
    <React.Fragment>
       {cartItem.length ? cartItem.map((item: Props, index: any) => (
      <Card key= {index} className={classes.root}>
      <CardActionArea className={classes.actionArea} >
        <CardMedia
          className={classes.media}
          image={Image}
          title="Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
         
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button onClick={ ()=> removeItem(index)} size="small">
          Remove
        </Button>
      </CardActions>
    </Card>
       )
    ): null}
    </React.Fragment>
  )
}

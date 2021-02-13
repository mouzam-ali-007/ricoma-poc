/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core'
import Image from '../images/glasses.jpg'; 

import {  useMutation, useQuery } from '@apollo/client';
import {fetchProducts, loginCompany} from '../queries/mutation';

interface Props {
  _id: string;
  
  image: string;
   name: string;
 details: string;
}
interface loginVar {
    email: string
    password: string
}
interface productParams {
  companyId: string
}
interface Company {
    _id: number
    accessToken: string
    name: string
    email: string
    contact: string
    address: string
    password: string
  }
  interface Products {
    _id: number
    name: string
    details: string
    image: string
    companyId: string
    quantity: string
  }
const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton:{
    color: 'white',
    background: 'black'
  }
}))

function Product(productData: Props) {
  const classes = useStyles()
  const [cartArray, setCartArray] = useState([] as Props[])
  

  const { loading, error, data } = useQuery(fetchProducts, {
    variables: { companyId :'60250d52d043c934f0b12640' },
  });

    useEffect(() => {
      // console.log('Data from Product', data )
    }, [data, error])


      const addToCart = (data: Props )=> {
       try {
          const cartProducts =JSON.parse(localStorage.getItem('cart') || '{}' );
          setCartArray(cartProducts);
    
          setCartArray(prev => {
             return [ data , ...prev ];
          });
          } catch (error) {
              console.log(error)
          }
        }

        if (cartArray.length){
          console.log('after cartArray', cartArray);
          localStorage.setItem('cart', JSON.stringify(cartArray));
        }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image= { Image }
          title='Image title'
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
          {productData ? productData.name : 'lorem ipsum'}
          </Typography>
          <Typography>
          {productData ? productData.details : 'lorem ipsum lorem ipsum '}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button onClick={()=>loginHelper()} size='small' color='primary'>
            View
          </Button>
          <Button size='small' color='primary'>
            Edit
          </Button>
        </CardActions> */}
        <Button onClick={()=>addToCart(productData)} size='large' className={classes.cardButton} >
            Add to Cart
          </Button>
      </Card>
    </Grid>
  )
}
export default Product

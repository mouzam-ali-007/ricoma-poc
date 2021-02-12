/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react'
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
  card: number
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
  interface Product {
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

function Product(list: Props) {
  const classes = useStyles()

  // const [loginComp, { error, data }] = useMutation<
  //     { Company: Company },
  //     loginVar
  //   >(loginCompany)

  const { loading, error, data } = useQuery(fetchProducts, {
    variables: { companyId :'60250d52d043c934f0b12640' },
  });

    useEffect(() => {
        //  console.log('Data from Product', data ,error)
      }, [data, error])

    const loginHelper = () => {
      console.log('working');
          try {

            // loginComp({
            //   variables: {
            //     email: 'admin@dell.com',
            //     password: 'admin',
            //   },
            // })
          } catch (error) {
            console.log(error)
          }
        }
        const addToCart = (data: any )=> {
          console.log('working', data);
              try {
              } catch (error) {
                console.log(error)
              }
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
          {data ? data.fetchProducts[0].name : 'lorem ipsum'}
          </Typography>
          <Typography>
          {data ? data.fetchProducts[0].details : 'lorem ipsum lorem ipsum '}
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
        <Button onClick={()=>addToCart(list)} size='large' className={classes.cardButton} >
            Add to Cart
          </Button>
      </Card>
    </Grid>
  )
}
export default Product

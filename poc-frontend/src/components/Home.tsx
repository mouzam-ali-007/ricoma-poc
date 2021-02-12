import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Image from '../images/HeroBackground.png'; 
import { Typography , Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import TopBar from './TopBar'
import Product from './Product';
import {  useQuery } from '@apollo/client';
import {fetchProducts} from '../queries/mutation';


// interface Product {
//   _id: number
//   name: string
//   details: string
//   image: string
//   companyId: string
//   quantity: string
// }

const Copyright = () =>{
  return (
    <Typography variant='body2' color='primary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Ricoma Poc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(8, 0, 6),
  },
  font: {
    position: "absolute",
    top: "20%",
    textAlign: "center",
    color: "black",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  footer: {
    backgroundColor: 'black',
    padding: theme.spacing(6),
    color: 'white'
  },
}))

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Home() {
  const classes = useStyles()
  const [productList, setProductList] = useState<any[]>([])
  
  const { loading, error, data } = useQuery(fetchProducts, {
    variables: { companyId :'60250d52d043c934f0b12640' },
  });

  useEffect(() => {
    console.log('Data from Product', data ,error)
    if(data){
      setProductList(data.fetchProducts)
    }
    
}, [data, error])

console.log(productList)
  return (
    <React.Fragment>
      <TopBar />
      <main>
        {/* Hero unit */}
        
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="600"
            image={Image}
            title="Contemplative Reptile"
          />
          <Typography
            gutterBottom
            variant="h1"
            component="h1"
            className={classes.font}
          >
            Lorem ipsum
          </Typography>
        </Card>

        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {productList.map((data,index):any => {
              return <Product key={data._id} 
              name={data.name}
              details={data.details}
              _id={data._id}
              image={data.image}
              />
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Ricoma Poc
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='primary'
          component='p'
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../images/HeroBackground.png";
import TopImage from "../images/TopImage.png";
import TopBanner from '../components/TopBanner';

import { Typography, Card, CardMedia, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TopBar from "./TopBar";
import Product from "./Product";
import { useQuery } from "@apollo/client";
import { fetchProducts } from "../queries/mutation";
import Chair from "../images/chair.jpg";
import Glasses from "../images/glasses.jpg";
import AirPods from "../images/airpods.jpg";
import Plant from "../images/plant.jpg";
import { cartItemsVar } from "../cache";

const Copyright = () => {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ricoma Poc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(8, 0, 6),
    height: "800px",
  },
  font: {
    maxWidth: "500px",
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: "36px",
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
  content: {
    position: "relative",
    bottom: "600px",
  },

  footer: {
    backgroundColor: "black",
    padding: theme.spacing(6),
    color: "white",
  },
  cardButton: {
    color: "white",
    background: "black",
    position: "relative",
  },
  topImage: {
    position: "relative",
    width: "40%",
    height: "30%",
    //top: '20px',
    left: "55%",
    bottom: "100px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [productList, setProductList] = useState<any[]>([]);

  const { loading, error, data } = useQuery(fetchProducts, {
    variables: { companyId: "602a6dd940898751b04970f0" },
  });

  useEffect(() => {
    if (data) {
      console.log("Data from Product", data, error);

      setProductList(data.fetchProducts);
    }
  }, [data, error]);

  let images = [Chair, Glasses, AirPods, Plant];

  return (
    <React.Fragment>
      <TopBanner/>
      <TopBar />
      <main>
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="BackgroundImage"
            height="800px"
            image={Image}
            title="BackgroundImage"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h1" component="h1" className={classes.font}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </Typography>
            {/* <Button  size="large" color= 'secondary' className={classes.cardButton}>
              Lorem ipsum
            </Button> */}
            <CardMedia
              className={classes.topImage}
              component="img"
              alt="TopImage"
              height="600"
              image={TopImage}
              title="TopImage"
            />
          </CardContent>
        </Card>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {productList.map((data, index): any => {
              return (
                <Product
                  key={data._id}
                  name={data.name}
                  details={data.details}
                  _id={data._id}
                  image={images[Math.floor(Math.random() * images.length)]}
                />
              );
            })}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Ricoma Poc
        </Typography>
        <Typography variant="subtitle1" align="center" color="primary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

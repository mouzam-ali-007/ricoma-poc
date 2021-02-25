/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { cartItemsVar } from "../cache";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";

interface Props {
  _id: string;
  image: string;
  name: string;
  details: string;
}
interface loginVar {
  email: string;
  password: string;
}
interface productParams {
  companyId: string;
}
interface Company {
  _id: number;
  accessToken: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  password: string;
}
interface Products {
  _id: number;
  name: string;
  details: string;
  image: string;
  companyId: string;
  quantity: string;
}
const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    boxShadow: "   0px 0px 5px 0px rgba(102, 107, 107, 0.55)",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    color: "white",
    background: "black",
  },

  icon: {
    borderRadius: 3,
    width: 23,
    height: 23,
    boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    "&:before": {
      display: "block",
      width: 23,
      height: 23,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },

  firstCheckbox: {
    backgroundColor: "#81396F",
  },

  secondCheckbox: {
    backgroundColor: "#F6437D",
  },
  thirdCheckbox: {
    backgroundColor: "#143061",
  },
}));

function Product(productData: Props) {
  const classes = useStyles();
  const [cartArray, setCartArray] = useState([] as Props[]);
  const [firstCheckbox, setFirstCheckbox] = React.useState(false);
  const [secondCheckbox, setSecondCheckbox] = React.useState(false);
  const [thirdCheckbox, setThirdCheckbox] = React.useState(false);
  const [productColor, setProductColor] = useState("");
  const [selected, setSelected] = React.useState([] as any);

  const addToCart = (data: any) => {
    let color = productColor;
    const itemData = { ...data, color };
    try {
      const cartProducts = cartItemsVar();
      if (cartProducts.length) {
        setCartArray(cartProducts);
      }

      setCartArray((prev) => {
        return [itemData, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (cartArray.length) {
    cartItemsVar(cartArray);

    console.log(cartItemsVar());
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardMedia} image={productData.image} title="Image title" />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {productData ? productData.name : "lorem ipsum"}
          </Typography>
          <Typography>{productData ? productData.details : "lorem ipsum lorem ipsum "}</Typography>
        </CardContent>
        <div>
          <Checkbox
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon, classes.firstCheckbox)} />
            }
            icon={<span className={clsx(classes.icon, classes.firstCheckbox)}> </span>}
            checked={!!firstCheckbox}
            onChange={(event) => {
              setProductColor("#81396F");
              setFirstCheckbox(event.target.checked);
              setSecondCheckbox(false);
              setThirdCheckbox(false);
            }}
          />
          <Checkbox
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon, classes.secondCheckbox)} />
            }
            icon={<span className={clsx(classes.icon, classes.secondCheckbox)}> </span>}
            checked={!!secondCheckbox}
            onChange={(event) => {
              setProductColor("#F6437D");
              setFirstCheckbox(false);
              setSecondCheckbox(event.target.checked);
              setThirdCheckbox(false);
            }}
          />
          <Checkbox
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon, classes.thirdCheckbox)} />
            }
            icon={<span className={clsx(classes.icon, classes.thirdCheckbox)}> </span>}
            checked={!!thirdCheckbox}
            onChange={(event) => {
              setProductColor("#143061");
              setFirstCheckbox(false);
              setSecondCheckbox(false);
              setThirdCheckbox(event.target.checked);
            }}
          />
        </div>
        <Button onClick={() => addToCart(productData)} size="large" className={classes.cardButton}>
          Add to Cart
        </Button>
      </Card>
    </Grid>
  );
}
export default Product;

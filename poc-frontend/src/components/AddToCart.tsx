import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";
import Image from "../images/glasses.jpg";
import Button from "@material-ui/core/Button";
import { cartItemsVar } from "../cache";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "300px",
    padding: "10px",
  },
  media: {
    borderRadius: "10px",
    padding: "10px",
    width: "100px",
    height: 50,
  },
  actionArea: {
    display: "flex",
  },

  actions: {
    marginLeft: "100px",
  },
  header: {
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    drawerContainer: {
      padding: "20px 30px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  },
}));
interface Props {
  _id: string;

  image: string;
  name: string;
  details: string;
}
interface AddToCartProps {
  setCount: Function;
  handleClick: () => void;
}

export default function AddToCart({ setCount, handleClick }: AddToCartProps) {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState(cartItemsVar());
  useEffect(() => {
    setCount(cartItems.length);
    if (cartItems.length === 0) {
      handleClick();
    }
    console.log("cart tiems ", cartItems.length);
  }, [cartItems.length, setCount]);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const removeItem = (index: number) => {
    forceUpdate();
    cartItemsVar().splice(index, 1);
    console.log("After splice", cartItemsVar());
    setCartItems(cartItemsVar());
    console.log("After splice", cartItems);
  };
  const forceUpdate = useForceUpdate();

  return (
    <React.Fragment>
      {cartItems.length
        ? cartItems.map((item: Props, index: any) => (
            <Card key={index} className={classes.root}>
              <CardActionArea className={classes.actionArea}>
                <CardMedia className={classes.media} image={item.image} title="Image" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button onClick={() => removeItem(index)} size="small">
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))
        : null}
    </React.Fragment>
  );
}

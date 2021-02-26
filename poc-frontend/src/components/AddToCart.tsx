/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { cartItemsVar } from "../cache";
import clsx from "clsx";

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
  productName: {
    fontWeight: 650,
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
    if (!cartItems.length) {
      handleClick();
    }
  }, [cartItems.length, setCount]);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const removeItem = (index: number) => {
    forceUpdate();
    cartItemsVar().splice(index, 1);
    setCartItems(cartItemsVar());
  };
  const forceUpdate = useForceUpdate();

  return (
    <React.Fragment>
      {cartItems.length
        ? cartItems.map((item: any, index: any) => (
            <Card key={index} className={classes.root}>
              <CardActionArea className={classes.actionArea}>
                <CardMedia className={classes.media} image={item.image} title="Image" />
                <CardContent>
                  <Typography gutterBottom>
                    <h4 className={classes.productName}>{item.name}</h4>
                  </Typography>
                  <Typography gutterBottom>
                    {item.color === "#81396F" ? (
                      <Checkbox
                        checkedIcon={
                          <span
                            className={clsx(
                              classes.icon,
                              classes.checkedIcon,
                              classes.firstCheckbox
                            )}
                          />
                        }
                        checked
                        disabled
                      />
                    ) : (
                      <Checkbox
                        icon={<span className={clsx(classes.icon, classes.firstCheckbox)}> </span>}
                        disabled
                      />
                    )}
                    {item.color === "#F6437D" ? (
                      <Checkbox
                        checkedIcon={
                          <span
                            className={clsx(
                              classes.icon,
                              classes.checkedIcon,
                              classes.secondCheckbox
                            )}
                          />
                        }
                        checked
                        disabled
                      />
                    ) : (
                      <Checkbox
                        icon={<span className={clsx(classes.icon, classes.secondCheckbox)}> </span>}
                        disabled
                      />
                    )}

                    {item.color === "#143061" ? (
                      <Checkbox
                        checkedIcon={
                          <span
                            className={clsx(
                              classes.icon,
                              classes.checkedIcon,
                              classes.thirdCheckbox
                            )}
                          />
                        }
                        checked
                        disabled
                      />
                    ) : (
                      <Checkbox
                        icon={<span className={clsx(classes.icon, classes.thirdCheckbox)}> </span>}
                        disabled
                      />
                    )}
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

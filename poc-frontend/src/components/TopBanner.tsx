import React, { useState, useEffect, useRef } from "react";
import { Button, makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  headerStyle: {
    backgroundColor: "#1f3162   ",
    color: "white",
    height: "15%",
    fontWeight: 600,
  },
  contentContainer: {},
  deleteButtonStyle: {
    padding: "14px",
    color: "white",
    fontWeight: 600,
  },
}));

export default function TopBanner() {
  const classes = useStyles();

  const [showHeader, setShowHeader] = useState(true);
  const [days, setDays] = useState<any>(0);
  const [hours, setHours] = useState<any>(0);
  const [minutes, setMinutes] = useState<any>(0);
  const [seconds, setSeconds] = useState<any>(0);

  let interval = useRef<number | null>(null);

  const startTimer = () => {
    let countdownDate = new Date().getTime() + 86400000 * 3;

    interval.current = window.setInterval(() => {
      const currentDate = new Date().getTime();
      const dateDifference = countdownDate - currentDate;

      const days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((dateDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((dateDifference / 1000 / 60) % 60);
      const seconds = Math.floor((dateDifference / 1000) % 60);

      if (dateDifference < 0) {
        window.clearInterval(interval.current || 0);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      window.clearInterval(interval.current || 0);
    };
  });

  const handleDeleteHeader = () => {
    setShowHeader(false);
  };

  if (!showHeader) return <div />;

  return (
    <Tooltip className={classes.headerStyle} title="">
      <Grid className={classes.contentContainer} container spacing={1}>
        <Grid item xs={2} />
        <Grid container spacing={1} xs={8}>
          <Grid item xs={12} lg={6}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </Grid>
          <Grid item xs={12} lg={6}>
            <p>
              {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
            </p>
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1}>
          <Button className={classes.deleteButtonStyle} onClick={handleDeleteHeader}>
            X
          </Button>
        </Grid>
      </Grid>
    </Tooltip>
  );
}

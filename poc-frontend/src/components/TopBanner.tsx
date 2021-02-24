import React, { useState, useEffect, useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
	headerStyle: {
		backgroundColor: '#1f3162   ',
		color: 'white',
		height: '15%',
		fontWeight: 600
	},
	contentContainer: {},
	deleteButtonStyle: {
		padding: '14px',
		color: 'white',
		fontWeight: 600
	}
}));

export default function TopBanner() {
	const classes = useStyles();

	const [ showHeader, setShowHeader ] = useState(true);
	const [ timerDays, setTimerDays ] = useState<any>('00');
	const [ timerHours, setTimerHours ] = useState<any>('00');
	const [ timerMinutes, setTimerMinutes ] = useState<any>('00');
	const [ timerSeconds, setTimerSeconds ] = useState<any>('00');

	let interval = useRef<number | null>(null);

	const startTimer = () => {
		let countdownDate = new Date().getTime() + 86400000*3;

		interval.current = window.setInterval(() => {
			const now = new Date().getTime();
			const distance = countdownDate - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((distance / 1000 / 60) % 60);
			const seconds = Math.floor((distance / 1000) % 60);

			if (distance < 0) {
				window.clearInterval(interval.current || 0);
			} else {
				setTimerDays(days);
				setTimerHours(hours);
				setTimerMinutes(minutes);
				setTimerSeconds(seconds);
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

	if (showHeader == false) return <div />;

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
							{timerDays} days : {timerHours} hrs : {timerMinutes} min : {timerSeconds} secs
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

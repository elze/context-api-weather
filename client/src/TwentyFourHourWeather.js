import React, { useContext } from 'react';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { WeatherElement } from './WeatherElement'
import ForecastContext from './forecastContext'

export function TwentyFourHourWeather({ dayIndex }) {
	const forecastState = useContext(ForecastContext);
	const dayRemover = forecastState.removeDay;
  return (
    <>
	<Button onClick={() => dayRemover(dayIndex)} >Remove this day</Button>
	<WeatherElement partOfDay={"day"}/>
	<WeatherElement partOfDay={"night"}/>	
	</>
	);
}
import React, { useContext } from 'react'

import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ForecastContext from './forecastContext'

function getBadgeVariant(tempUnit) {
	if (tempUnit === 'F') 
		return 'warning';
	return 'info';
}

function getTemperatureAdjective(partOfDay) {
	if (partOfDay === 'day') 
		return '(high)';
	return '(low)';
}

export function WeatherElement({ partOfDay }) {
	const forecastState = useContext(ForecastContext);
	const forecast = forecastState.forecast;
	const forecastElem = forecast[partOfDay];
	const currTemperatureUnit = forecastState.temperatureUnit;
  return (
		 <Card>
		  <Card.Body>
			<Card.Title>{partOfDay.toUpperCase()}</Card.Title>
			<ListGroup>
			 <ListGroup.Item><b>Weather</b>: {forecastElem.weather}</ListGroup.Item>
			 <ListGroup.Item><b>Rain chance</b>: {forecastElem.rainchance}</ListGroup.Item>
			 <ListGroup.Item><b>Temperature {getTemperatureAdjective(partOfDay)}</b> : 
			  <Badge variant={getBadgeVariant(currTemperatureUnit)}>{forecastElem.temp_extreme}</Badge>
			 </ListGroup.Item>
			</ListGroup>
		  </Card.Body>
		 </Card>
	);
}
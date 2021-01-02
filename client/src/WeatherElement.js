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

export function WeatherElement({ //forecastElem, 
		partOfDay, currTemperatureUnit }) {
	const forecast = useContext(ForecastContext);
	const forecastElem = forecast[partOfDay];
  return (
		 <Card>
		  <Card.Body>
			<Card.Title>{partOfDay.toUpperCase()}</Card.Title>
			<ListGroup>
			 <ListGroup.Item><b>Weather</b>: {forecastElem.weather}</ListGroup.Item>
			 <ListGroup.Item><b>Rain chance</b>: {forecastElem.rainchance}</ListGroup.Item>
			 <ListGroup.Item><b>Temperature</b>: <Badge variant={getBadgeVariant(currTemperatureUnit)}>{forecastElem.temp_extreme}</Badge></ListGroup.Item>
			</ListGroup>
		  </Card.Body>
		 </Card>
	);
}
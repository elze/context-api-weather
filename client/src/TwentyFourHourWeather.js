import React from 'react';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function getBadgeVariant(tempUnit) {
	if (tempUnit === 'F') 
		return 'warning';
	return 'info';
}

export function TwentyFourHourWeather({ forecast, state }) {
  return (
    <>
		 <Card>
		  <Card.Body>
			<Card.Title>Day</Card.Title>
			<ListGroup>
			 <ListGroup.Item><b>Weather</b>: {forecast.day.weather}</ListGroup.Item>
			 <ListGroup.Item><b>Rain chance</b>: {forecast.day.rainchance}</ListGroup.Item>
			 <ListGroup.Item><b>Temperature</b>: <Badge variant={getBadgeVariant(state.temperatureUnit)}>{forecast.day.temp_high}</Badge></ListGroup.Item>
			</ListGroup>
		  </Card.Body>
		 </Card>
		 <Card>
		  <Card.Body>
			<Card.Title>Night</Card.Title>
			<ListGroup>
			 <ListGroup.Item><b>Weather</b>: {forecast.night.weather}</ListGroup.Item>
			 <ListGroup.Item><b>Rain chance</b>: {forecast.night.rainchance}</ListGroup.Item>
			 <ListGroup.Item><b>Temperature</b>: <Badge variant={getBadgeVariant(state.temperatureUnit)}>{forecast.night.temp_low}</Badge></ListGroup.Item>
			</ListGroup>
		  </Card.Body>
		 </Card>
	</>
	);
}
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function getBadgeVariant(tempUnit) {
	if (tempUnit === 'F') 
		return 'warning';
	return 'info';
}

export function WeatherElement({ forecastElem, timeOfDay, currTemperatureUnit }) {
  return (
		 <Card>
		  <Card.Body>
			<Card.Title>{timeOfDay}</Card.Title>
			<ListGroup>
			 <ListGroup.Item><b>Weather</b>: {forecastElem.weather}</ListGroup.Item>
			 <ListGroup.Item><b>Rain chance</b>: {forecastElem.rainchance}</ListGroup.Item>
			 <ListGroup.Item><b>Temperature</b>: <Badge variant={getBadgeVariant(currTemperatureUnit)}>{forecastElem.temp_extreme}</Badge></ListGroup.Item>
			</ListGroup>
		  </Card.Body>
		 </Card>
	);
}
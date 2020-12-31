import logo from './logo.svg';
import './App.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

function reducer(state, action) {
	console.log(`reducer: action.type = ${action.type}`);
  switch (action.type) {
	  case 'setTemperatureUnit': 
		if (action.unit !== state.temperatureUnit)
			return {forecasts: getForecastsInCurrentUnits(state.forecasts, action.unit), temperatureUnit: action.unit};
		return state;
	  case 'setForecasts': 	  
		if (state.temperatureUnit === 'C') {
			let newState = {...state, forecasts: getForecastsInCurrentUnits(action.forecasts, state.temperatureUnit) };
			return newState;
		}
		let newState = {...state, forecasts: action.forecasts};
		return newState;
    default:
      throw new Error();
  }
}

function getBadgeVariant(tempUnit) {
	if (tempUnit === 'F') 
		return 'warning';
	return 'info';
}


function getButtonVariant(state, tempUnit) {
	if (state.temperatureUnit === tempUnit) 
		return 'info';
	return 'light';
}

function getForecastsInCurrentUnits(forecasts, tempUnit) {
	let convertedForecasts = [];	
	if (tempUnit === "C") {	
		for (let forecast of forecasts) {
				const tempHigh = (forecast.day.temp_high - 32) / 9 * 5;		
				const tempLow = (forecast.night.temp_low - 32) / 9 * 5;		
				const convertedForecast = 
				{...forecast, day: {...forecast.day, temp_high:tempHigh.toFixed()}, 
								night: {...forecast.night, temp_low: tempLow.toFixed()}
				};
				convertedForecasts.push(convertedForecast);
		}
		return convertedForecasts;
	}
	// Otherwise the temperatures are in Fahrenheit
	for (let forecast of forecasts) {
		const tempHigh = forecast.day.temp_high / 5 * 9 + 32;		
		const tempLow = forecast.night.temp_low / 5 * 9 + 32;	
		const convertedForecast = 
			{...forecast, day: {...forecast.day, temp_high:tempHigh.toFixed()}, 
						night: {...forecast.night, temp_low: tempLow.toFixed()}
			};
			convertedForecasts.push(convertedForecast);
	}
	return convertedForecasts;	
}

function App() {
	const initialState = {forecasts: [], temperatureUnit: "F"};
	let myInterval = React.useRef(null);
	const [state, dispatch] = React.useReducer(reducer, initialState);
  
	React.useEffect(() => {    
		async function getForecasts() {
			const response = await fetch('/api/forecasts');
			const forecasts = await response.json();
			if (response.status !== 200) {
				throw Error(forecasts.message);
			}
			console.log(`getForecasts()`);
			dispatch({type: 'setForecasts', forecasts: forecasts})
		}
		console.log(`useEffect is running`);
		getForecasts();

		return () => {
			console.log('Alert removed');
		};

	}, []);
	
  return (
	<>
     <Alert variant="info" className="weather-alert">
	  <Alert.Heading className="weather-title text-center">My Austin weather alert</Alert.Heading>
	  <div className="weather-title">
	  <Button onClick={() => dispatch({type: 'setTemperatureUnit', unit: 'F'})} variant={getButtonVariant(state, "F")}>F</Button>
	  <Button onClick={() => dispatch({type: 'setTemperatureUnit', unit: 'C'})} variant={getButtonVariant(state, "C")}>C</Button>
	  </div>
	 </Alert>	
		<div className="weather-title">
        {
          state.forecasts.map((forecast, ind) => { 
            return (		
		<CardGroup className="weather-alert">
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
		</CardGroup>		 
		 )
		 })
		}
	    </div>
	</>
  );
}

export default App;

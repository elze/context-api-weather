import './App.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'


import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { TwentyFourHourWeather } from './TwentyFourHourWeather'

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

function getButtonVariant(state, tempUnit) {
	if (state.temperatureUnit === tempUnit) 
		return 'info';
	return 'light';
}

function getForecastsInCurrentUnits(forecasts, tempUnit) {
	let convertedForecasts = [];	
	if (tempUnit === "C") {	
		for (let forecast of forecasts) {
				const tempHigh = (forecast.day.temp_extreme - 32) / 9 * 5;		
				const tempLow = (forecast.night.temp_extreme - 32) / 9 * 5;		
				const convertedForecast = 
				{...forecast, day: {...forecast.day, temp_extreme:tempHigh.toFixed()}, 
								night: {...forecast.night, temp_extreme: tempLow.toFixed()}
				};
				convertedForecasts.push(convertedForecast);
		}
		return convertedForecasts;
	}
	// Otherwise the temperatures are in Fahrenheit
	for (let forecast of forecasts) {
		const tempHigh = forecast.day.temp_extreme / 5 * 9 + 32;		
		const tempLow = forecast.night.temp_extreme / 5 * 9 + 32;	
		const convertedForecast = 
			{...forecast, day: {...forecast.day, temp_extreme: tempHigh.toFixed()}, 
						night: {...forecast.night, temp_extreme: tempLow.toFixed()}
			};
			convertedForecasts.push(convertedForecast);
	}
	return convertedForecasts;	
}

function App() {
	const initialState = {forecasts: [], temperatureUnit: "F"};
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
		<TwentyFourHourWeather forecast={forecast} currTemperatureUnit={state.temperatureUnit} />
		</CardGroup>		 
		 )
		 })
		}
	    </div>
	</>
  );
}

export default App;

import './App.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { ForecastProvider } from './forecastContext'


import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { TwentyFourHourWeather } from './TwentyFourHourWeather'

function averageLow(forecasts) {
	if (forecasts.length > 0) {
		const lows = forecasts.map(f => parseInt(f["night"].temp_extreme));
		const sumReducer = (previousValue, currentValue) => previousValue + currentValue;
		const sum = lows.reduce(sumReducer);
		console.log(`lows.reduce(sumReducer) = ${sum}`);
		const ret = sum / lows.length;
		console.log(`ret = ${ret}`);
		//return lows.reduce(sumReducer) / lows.length;
		return ret;
	}
	return 0;
}

function averageHigh(forecasts) {
	if (forecasts.length > 0) {
		const lows = forecasts.map(f => parseInt(f["day"].temp_extreme));
		const sumReducer = (previousValue, currentValue) => previousValue + currentValue;
		const sum = lows.reduce(sumReducer);
		console.log(`lows.reduce(sumReducer) = ${sum}`);
		const ret = sum / lows.length;
		console.log(`ret = ${ret}`);
		//return lows.reduce(sumReducer) / lows.length;
		return ret;
	}
	return 0;
}

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
		let newState1 = {...state, forecasts: action.forecasts};
		return newState1;
	  case 'removeDay': 
		let newForecasts = [...state.forecasts];
		newForecasts.splice(action.dayNumber, 1);
		let newState2 = {...state, forecasts: newForecasts};
		return newState2;		
    default:
      throw new Error();
  }
}

function getButtonVariant(state, tempUnit) {
	if (state.temperatureUnit === tempUnit) {
		if (tempUnit === 'F')
			return 'warning'
		return 'info';
	}
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
	  <div className="weather-title">Average low: { averageLow(state.forecasts) } </div>
	  <div className="weather-title">Average high: { averageHigh(state.forecasts) } </div>
	 </Alert>	
		<div className="weather-title">
        {
          state.forecasts.map((forecast, ind) => { 
            return (		
			 <ForecastProvider value={{forecast: forecast, temperatureUnit: state.temperatureUnit, removeDay: (dayNum) => dispatch({type: 'removeDay', dayNumber: dayNum})}}>
			  <Card.Header>{ forecast.date }</Card.Header>
			  <CardGroup className="weather-alert">
				<TwentyFourHourWeather dayIndex={ind}/>
			  </CardGroup>		 
			 </ForecastProvider>
		 )
		 })
		}
	    </div>
	</>
  );
}

export default App;

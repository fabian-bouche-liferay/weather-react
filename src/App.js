import React, { useState, useEffect } from 'react';
import './App.css';
import ClayList from '@clayui/list';

function App(props) {

	const [temperature, setTemperature] = useState();
	const [weather, setWeather] = useState();
	const [population, setPopulation] = useState();
	const [language, setLanguage] = useState();

  useEffect(() => {

    if(props.cityData != "") {
      const obj = JSON.parse(props.cityData);
      setPopulation(obj.population);
      setLanguage(obj.language);
    }

    const fetchWeather = () => {
      fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + props.city + ',' + props.country + '&limit=1&appid=' + props.apiKey)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        let lat = data[0].lat;
        let lon = data[0].lon;
        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + props.apiKey)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            setTemperature(data.main.temp);
            setWeather(data.weather[0].main);
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
    }
    if(props.city !== null && props.city !== undefined && props.city !== ""
      && props.country !== null && props.country !== undefined && props.country !== "") {
        console.log("Fetch weather for " + props.city);
        fetchWeather();
    }
  }, [props.city, props.country, props.apiKey, props.cityData]);

  return (
    <ClayList>
      <ClayList.Header>{props.city}, {props.country}</ClayList.Header>
      <ClayList.Item flex>
        <ClayList.ItemField expand>
          <ClayList.ItemTitle>Language</ClayList.ItemTitle>
          <ClayList.ItemText>{language}</ClayList.ItemText>
        </ClayList.ItemField>
        <ClayList.ItemField expand>
          <ClayList.ItemTitle>Population</ClayList.ItemTitle>
          <ClayList.ItemText>{population} inhabitants</ClayList.ItemText>
        </ClayList.ItemField>
      </ClayList.Item>
      <ClayList.Header>Weather</ClayList.Header>
      <ClayList.Item flex>
        <ClayList.ItemField expand>
          <ClayList.ItemTitle>Temperature</ClayList.ItemTitle>
          <ClayList.ItemText>{temperature} °C</ClayList.ItemText>
        </ClayList.ItemField>
        <ClayList.ItemField expand>
          <ClayList.ItemTitle>Description</ClayList.ItemTitle>
          <ClayList.ItemText>{weather}</ClayList.ItemText>
        </ClayList.ItemField>
      </ClayList.Item>
    </ClayList>
  );
}

export default App;

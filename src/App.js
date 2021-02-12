import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get ("http://api.openweathermap.org/data/2.5/weather",{
      params:{
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATER_KEY,
        lang: 'pt',
        units: 'metric',
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  //Pede autorização de localização para o navegador
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  //validação da permissão da localização
  if (location == false) {
    return (
      <Fragment>
        Você precisa autorizar a localização no navegador!!
      </Fragment>
    )
  } else if(weather==false){
    return(
    <Fragment>
      Carregando o clima...
    </Fragment>
    )
  } else {
    return(
      
    <Fragment>

      <h3 id="Header">Clima em {weather['name']} ({weather['weather'][0]['description']}) </h3>
      <hr />

      <div className="Container">

        <ul>
          <li>Temperatura atual: {weather['main']['temp']} º </li>
          <li>Temperatura Máxima: {weather['main']['temp_max']} º </li>
          <li>Temperatura Miníma: {weather['main']['temp_min']} º </li>
          <li>Pressão: {weather['main']['pressure']} </li>
          <li>Umidade: {weather['main']['humidity']} % </li>
        </ul>

      </div>

    </Fragment>
    )};
}
export default App;

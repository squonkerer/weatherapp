import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { fetchWeatherData } from './Utilities';
import Weather from './Weather';

function App() {
  const [cities] = useState([
    {
      name: 'Tallinn',
      lat: 59.38,
      long: 28.17,
      weatherData: null,
    },
    {
      name: 'London',
      lat: 51.50,
      long: -0.12,
      weatherData: null,
    },
    {
      name: 'Oslo',
      lat: 59.91,
      long: 10.74,
      weatherData: null,
    },
  ])

  const rowClicked = async (id) => {
    console.log('clicked ' + cities[id].name)
    const dataObj = await fetchWeatherData({
      lat: cities[id].lat,
      long: cities[id].long,
    })
    console.log(dataObj)
    setWeather(dataObj)
    setSelectedCity(cities[id].name);
  }

  const [weather, setWeather] = useState(null)
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <>
      <Container>
        <Row>
          <Col xs={4}>
            <h1>City</h1>
            {cities.map((city, index) => (<div onClick={() => rowClicked(index)} key={index}>{city.name}</div>))}
          </Col>
          <Col xs={4}>
            <h1>Weather</h1>
            <Weather city={selectedCity} weather={weather}/>
          </Col>
        </Row>
      </Container>
    </>
  )
};


export default App;

/*Harjutus 6
Ilmajaama rakenduses - näita valitud linna nime V
Ilmajaama rakenduses - uuri vastuse andmeid ning lisa näidatavate andmete hulka midagi veel V


Lae Ilmajaama projekt üles Netlify-sse V

Extra: Kasuta paremal paanil erinevaid taustapilte:
Kui temperatuur on alla 20 kraadi, siis näita pilti 1
Kui temperatuur on üle 20 kraadi, siis näita pilt 2
või vali enda tingimused ;) */
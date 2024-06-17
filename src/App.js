import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { fetchWeatherData, getAdressLocation } from './Utilities';
import Weather from './Weather';
import NewLocation from './NewLocation';

function App() {
  const [cities, setCities] = useState([
    {
      name: 'Tallinn',
      weatherData: null,
    },
    {
      name: 'London',
      weatherData: null,
    },
    {
      name: 'Oslo',
      weatherData: null,
    },
  ])

  const addLocation = (location) => {
    setCities([
      ...cities,
      {
        name: location,
        weatherData: null,
      }])
    setIsAddingActive(false)
    setActiveLocation(0)
  }

  const [weather, setWeather] = useState(null)
  const [selectedCity, setSelectedCity] = useState('');
  const [backgroundClass, setBackgroundClass] = useState('');
  const [isAddingActive, setIsAddingActive] = useState(false);
  const [activeLocation, setActiveLocation] = useEffect(0);

  

  const rowClicked = async (index, id) => {
    console.log('clicked ' + cities[id].name)
    setIsAddingActive(false)
    //loadLocationData(index)
    setActiveLocation(index)
    const locationData = await getAdressLocation(cities[id].name);
    console.log(locationData)
    const dataObj = await fetchWeatherData({
      lat: locationData.lat,
      long: locationData.lng,
    });
    console.log(dataObj);
    setWeather(dataObj);
    setSelectedCity(cities[id].name);

    const temperature = dataObj.current.temperature_2m;
    if (temperature < 10) {
      setBackgroundClass('cold');
    } else if (temperature >= 10 && temperature < 20) {
      setBackgroundClass('moderate');
    } else {
      setBackgroundClass('hot');
    }
  };

  useEffect(()=> {
    loadLocationData(activeLocation)
  }, [activeLocation])



  let rightPaneJsx = (
    <>
      <h1>Weather</h1>
      <Weather city={selectedCity} weather={weather} />
    </>
  )
  if (isAddingActive) {
    rightPaneJsx = <NewLocation addLocation={addLocation} />
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={4}>
            <h1>City</h1>
            {cities.map((city, index) => (<div onClick={() => rowClicked(index)} key={index}>{city.name}</div>))}
            <button className='btn btn-link'
              onClick={() => setIsAddingActive(true)}
            >Add City</button>
          </Col>
          <Col xs={4} className={backgroundClass}>
            {rightPaneJsx}
          </Col>
        </Row>
      </Container>
    </>
  )
};


export default App;

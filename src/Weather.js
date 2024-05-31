import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Weather({weather}) {
    if (!weather) {
        return <h3>Click on city</h3>
    }
    return(
        <div>
            <Row>
                <Col>
                    latitude
                </Col>
                <Col>
                    {weather.latitude}
                </Col>
            </Row>
            <Row>
                <Col>
                    longitude
                </Col>
                <Col>
                    {weather.longitude}
                </Col>
            </Row>
            <Row>
                <Col>
                    Current weather
                </Col>
                <Col>
                    <div>Temp: {weather.current.temperature_2m}</div>
                    <div>Wind: {weather.current.wind_speed_10m}</div>
                    <div>Precipitation: {weather.current.precipitation}</div>
                </Col>
            </Row>
        </div>
    )
}

export default Weather
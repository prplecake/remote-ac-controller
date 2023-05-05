import {HistoricalSensorData} from './components/HistoricalSensorData';
import {LatestSensorData} from './components/LatestSensorData';
import {Metrics} from './components/Metrics';
import React from 'react';
import {RemoteControl} from './components/RemoteControl';
import {Graph} from './components/Graph';
import {Col, Container, Row} from 'react-bootstrap';
import {Footer} from './components/Footer';

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row>
              <LatestSensorData/>
            </Row>
            <Row>
              <HistoricalSensorData/>
            </Row>
          </Col>
          <Col>
            <RemoteControl/>
            <br/>
            <Graph/>
            <br/>
            <Metrics/>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default App;

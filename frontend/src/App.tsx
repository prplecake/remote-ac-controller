import {HistoricalSensorData} from './components/HistoricalSensorData';
import {Metrics} from './components/Metrics';
import React from 'react';
import {RemoteControl} from './components/RemoteControl';
import {Graph} from './components/Graph';
import {Col, Container, Row} from 'reactstrap';
import {Footer} from './components/Footer';
import {Header} from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <Container className='main'>
        <Row>
          <Col className='order-lg-2'>
            <RemoteControl/>
            <br/>
            <Graph/>
            <br/>
            <Metrics/>
          </Col>
          <Col className='order-lg-1'>
            <Row>
              <HistoricalSensorData/>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default App;

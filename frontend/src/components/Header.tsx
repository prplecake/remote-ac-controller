import React from 'react';
import {Container} from 'reactstrap';
import {LatestSensorData} from './LatestSensorData';

export function Header() {
  return (
    <Container fluid>
      <header className='header'>
        <p>remote-ac-controller</p>
        <LatestSensorData/>
      </header>
    </Container>
  );
}
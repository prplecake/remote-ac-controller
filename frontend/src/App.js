import { HistoricalSensorData } from './components/HistoricalSensorData';
import { LatestSensorData } from './components/LatestSensorData';
import { Metrics } from './components/Metrics';
import React from 'react';
import { RemoteControl } from './components/RemoteControl';
import { Graph } from './components/Chart';

function App() {
  return (
    <div className="app">
      <div className="parent">
        <div className="child">
          <LatestSensorData />
          <HistoricalSensorData />
        </div>
        <div className="child">
          <RemoteControl />
          <br />
          <Graph />
          <Metrics />
        </div>
      </div>
    </div>
  );
}

export default App;

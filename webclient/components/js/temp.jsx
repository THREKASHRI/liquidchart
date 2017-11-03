import React, { Component } from 'react';
import { render } from 'react-dom';
import LiquidChart from 'react-liquidchart';

const stops = [
  // <stop key={1} stopColor="white" offset="5%" />
  // <stop key={2} stopColor="orange" offset="50%" />,
  // <stop key={3} stopColor="red" offset="85%" />,
];

class ChartLiquid extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '500px',
        }}
      >
        <LiquidChart
            responsive
            legend="Percentage of Completed Tasks"
            value={Math.random() * 100}
            showDecimal
            amplitude={4}
            frequency={2}
            animationTime={2000}
            animationWavesTime={2250}
            gradient={{
              type: 1,
              x1: 0,
              x2: 0,
              y1: 100,
              y2: 0,
              stops,
            }}
            postfix="%"
            legendFontSize={0.1}
          />
      </div>
    );
  }
}
render(<ChartLiquid />, document.getElementById('app'));

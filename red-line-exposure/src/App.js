import React, { useState } from 'react';
import './App.css';  // Import the CSS file

const bartStations = [
  { id: 1, name: 'Embarcadero', x: 50, y: 50 },
  { id: 2, name: 'Montgomery', x: 100, y: 50 },
  { id: 3, name: 'Powell Street', x: 150, y: 50 },
  { id: 4, name: 'Civic Center', x: 200, y: 50 },
  { id: 5, name: '16th Street Mission', x: 250, y: 100 },
  { id: 6, name: '24th Street Mission', x: 300, y: 100 },
];

const travelTimes = {
  'Embarcadero-Montgomery': 2,
  'Montgomery-Powell Street': 2,
  'Powell Street-Civic Center': 2,
  'Civic Center-16th Street Mission': 4,
  '16th Street Mission-24th Street Mission': 3,
};

export default function BartCustomMap() {
  const [station1, setStation1] = useState(null);
  const [station2, setStation2] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const selectStation = (station) => {
    if (!station1) {
      setStation1(station);
    } else if (!station2) {
      setStation2(station);
      calculateTime(station); // Calculate time when second station is selected
    }
  };

  const calculateTime = (secondStation) => {
    if (station1 && secondStation) {
      const key = `${station1.name}-${secondStation.name}`;
      setTravelTime(travelTimes[key] || 'No direct route found');
    }
  };

  return (
    <div className="container">
      <svg height="300" width="350" className="svg">
        {/* Render BART lines */}
        {bartStations.slice(1).map((station, index) => (
          <line
            key={index}
            x1={bartStations[index].x} y1={bartStations[index].y}
            x2={station.x} y2={station.y}
            stroke="red" strokeWidth="5"
          />
        ))}

        {/* Render BART stations */}
        {bartStations.map((station) => (
          <g key={station.id} onClick={() => selectStation(station)}>
            <circle
              cx={station.x} cy={station.y} r="10"
              fill={station1 === station || station2 === station ? 'yellow' : 'white'}
              stroke="black" strokeWidth="2"
            />
            <text
              x={station.x} y={station.y + 20} fill="black" fontSize="10"
              textAnchor="middle"
            >
              {station.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="infoContainer">
        <p>Station 1: {station1 ? station1.name : 'None'}</p>
        <p>Station 2: {station2 ? station2.name : 'None'}</p>
        <p>Travel Time: {travelTime || 'N/A'}</p>
        <button onClick={() => { setStation1(null); setStation2(null); setTravelTime(null); }} className="button">
          Reset
        </button>
      </div>
    </div>
  );
}

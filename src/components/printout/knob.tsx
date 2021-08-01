import * as React from 'react';
import { furIcons } from '../../interfaces/furs';
import './knob.scss';

const healthColors = [
  '#B1CD98', // 20
  '#DDE298', // 40
  '#F6EDA8', // 60
  '#EACDA3', // 80
  '#D68A7B', // 100
];

export function Knob({ percentage, type }: any) {
  // const percentage = 100;

  const left = Math.min(50, percentage);
  const right = Math.max(0, percentage - 50);

  const color = healthColors[Math.ceil((5 / 100) * percentage - 1)];

  return <div className='circular'>
    <div className='inner'></div>
    <img className='icon' alt='' src={furIcons[type]} />
    <div className='number'>{percentage}%</div>
    <div className='circle'>
      <div className='bar left'>
        <div className='progress' style={{ transform: `rotate(${(180 / 50) * left}deg)`, backgroundColor: color }}></div>
      </div>
      <div className='bar right'>
        <div className='progress' style={{ transform: `rotate(${(180 / 50) * right}deg)`, backgroundColor: color }}></div>
      </div>
    </div>
  </div>
}

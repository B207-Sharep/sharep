import React from 'react';
import * as S from './GrassStyle';

const GitHubGrid = ({ data }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
      {data.map((row: any[], rowIndex: number) => (
        <div key={rowIndex}>
          {row.map((isActive: boolean | undefined, colIndex: number) => (
            <S.GridSquare key={colIndex} $active={isActive} />
          ))}
        </div>
      ))}
    </div>
  );
};

const mockData = [
  [true, false, true, true, false, false, true],
  [false, true, true, false, true, false, false],
  [false, true, true, true, false, true, true],
  [true, false, false, true, true, false, false],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [true, false, true, true, false, false, true],
  [false, true, true, false, true, false, false],
  [false, true, true, true, false, true, true],
  [true, false, false, true, true, false, false],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [true, false, true, true, false, false, true],
  [false, true, true, false, true, false, false],
  [false, true, true, true, false, true, true],
  [true, false, false, true, true, false, false],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [true, true, true, false, false, true, false],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
  [false, false, true, true, false, true, true],
  [true, true, true, true, false, true, true],
];

export default function Grass() {
  return <GitHubGrid data={mockData} />;
}

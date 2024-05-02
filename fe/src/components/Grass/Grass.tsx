import React from 'react';
import * as S from './GrassStyle';

const GitHubGrid = ({ data }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
      {data.map((row: any[], rowIndex: number) => (
        <div key={rowIndex}>
          {row.map((isActive: any, colIndex: number) => (
            <S.GridSquare key={colIndex} $active={isActive.step}></S.GridSquare>
          ))}
        </div>
      ))}
    </div>
  );
};

const convertToGrid = (data: any[]) => {
  const rows = Math.ceil(data.length / 7);
  const grid: any[][] = [];

  for (let i = 0; i < rows; i++) {
    grid.push(data.slice(i * 7, (i + 1) * 7));
  }
  console.log(grid, 'GRID');

  return grid;
};

const grassData = {
  year: 2024,
  roleCount: 4,
  roles: [
    {
      step: 0,
      count: 0,
    },
    {
      step: 1,
      count: 5,
    },
    {
      step: 2,
      count: 3,
    },
    {
      step: 3,
      count: 9,
    },
    {
      step: 3,
      count: 9,
    },
    {
      step: 3,
      count: 9,
    },
    {
      step: 3,
      count: 9,
    },
    {
      step: 3,
      count: 9,
    },
    {
      step: 3,
      count: 9,
    },
  ],
};

export default function Grass({ grass }: any) {
  return <GitHubGrid data={convertToGrid(grass.jobs)} />;
}

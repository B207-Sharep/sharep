import React from 'react';
import * as S from './GrassStyle';

const GitHubGrid = ({ data }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
      {data.map((row: any[], rowIndex: number) => (
        <div key={rowIndex}>
          {row.map((isActive: any, colIndex: number) => (
            <S.GridSquare key={colIndex} $active={isActive.step} />
          ))}
        </div>
      ))}
    </div>
  );
};

const convertToGrid = (data: any[]) => {
  const rows = Math.ceil(data.length / 7); // 전체 길이를 7로 나누어 행 수 계산
  const grid: any[][] = [];

  for (let i = 0; i < rows; i++) {
    grid.push(data.slice(i * 7, (i + 1) * 7)); // 각 행에 해당하는 7개 요소로 나누어서 grid에 추가
  }
  console.log(grid, 'GRID');

  return grid;
};

const mockData = [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1];
const grassData = {
  year: 2024,
  jobCount: 4,
  jobs: [
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

export default function Grass() {
  return <GitHubGrid data={convertToGrid(grassData.jobs)} />;
}

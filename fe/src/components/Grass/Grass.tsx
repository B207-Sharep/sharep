import React, { useEffect, useRef } from 'react';
import * as S from './GrassStyle';

const GitHubGrid = ({ data }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 마운트될 때 스크롤 위치를 가장 오른쪽으로 이동시킵니다.
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      // 스크롤 컨테이너의 가장 오른쪽 위치를 계산합니다.
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      // 가장 오른쪽 위치로 스크롤을 이동시킵니다.
      scrollContainer.scrollLeft = maxScrollLeft;
    }
  }, []);
  return (
    <div
      ref={scrollContainerRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        overflowX: 'auto',
      }}
    >
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

export default function Grass({ grass }: any) {
  console.log(grass, 'grass');
  return <GitHubGrid data={convertToGrid(grass.jobs)} />;
}

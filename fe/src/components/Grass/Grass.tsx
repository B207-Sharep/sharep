import React from 'react';
import styled from 'styled-components';
import * as G from '@styles';
const GridSquare = styled.div<{
  $active?: boolean;
}>`
  width: 12px;
  height: 12px;
  margin: 2px;
  background-color: ${props => (props.$active ? `${G.PALETTE.GRASS_1}` : 'white')};
  border: solid 1px ${G.PALETTE.GRASS_1};
`;

const GitHubGrid = ({ data }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
      {data.map((row: any[], rowIndex: number) => (
        <div key={rowIndex}>
          {row.map((isActive: boolean | undefined, colIndex: number) => (
            <GridSquare key={colIndex} $active={isActive} />
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

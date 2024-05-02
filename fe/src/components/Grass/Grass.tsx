import React from 'react';
import styled from 'styled-components';

const GridSquare = styled.div<{
  active?: boolean;
}>`
  width: 10px;
  height: 10px;
  margin: 1px;
  background-color: ${props => (props.active ? '#2ea44f' : '#ebedf0')};
`;

const GitHubGrid = ({ data }: any) => {
  return (
    <div>
      {data.map((row: any[], rowIndex: number) => (
        <div key={rowIndex}>
          {row.map((isActive: boolean | undefined, colIndex: number) => (
            <GridSquare key={colIndex} active={isActive} />
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
];

export default function Grass() {
  return <GitHubGrid data={mockData} />;
}

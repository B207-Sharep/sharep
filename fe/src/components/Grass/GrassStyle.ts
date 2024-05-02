import styled from 'styled-components';
import * as G from '@styles';

export const GridSquare = styled.div<{
  $active?: number;
}>`
  width: 12px;
  height: 12px;
  margin: 2px;

  background-color: ${props => (props.$active === 0 ? `${G.PALETTE.NO_GRASS}` : G.PALETTE[`GRASS_${props.$active}`])};
  border: ${props => `solid 1px ${G.PALETTE[`GRASS_${props.$active}`]}`};
  border-radius: 2px;
`;

// export const GridSquare = styled.div<{
//     $active?: number;
//   }>`
//     width: 12px;
//     height: 12px;
//     margin: 2px;
//     background-color: ${props => G.PALETTE[`GRASS_${props.$active}`]};
//     border: ${props => `solid 1px ${G.PALETTE[`GRASS_${props.$active}`]}`};
//     border-radius: 2px;
//   `;

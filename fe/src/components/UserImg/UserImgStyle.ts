import styled from 'styled-components';
import * as G from '@/styles';

/**
 *
 * size ex) lg, md , sm
 */
interface Option {
  path: string;
  size: string;
}

export const ImgCircle = styled.div<Option>`
  width: ${props => (props.size === 'lg' ? '126px' : props.size === 'md' ? '72px' : '32px')};
  height: ${props => (props.size === 'lg' ? '126px' : props.size === 'md' ? '72px' : '32px')};
  background: no-repeat center/100% url(${props => props.path});
  border: solid 1px ${G.PALETTE.LIGHT_BLACK};

  border-radius: 40px;
`;

import styled from 'styled-components';
import * as G from '@/styles';

interface FontOption {
  $size: string;
  $weight: number | string;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 260px;
  row-gap: 36px;
`;

export const HeaderWrapper = styled.div`
  /* width: 100; */
  display: flex;
  row-gap: 36px;
  column-gap: 4px;
  justify-content: space-between;
`;

export const ProfileWrapper = styled.div`
  /* width: 100; */
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
`;

export const ProfileTextWrapper = styled.div`
  /* width: 100; */
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const GrassWrapper = styled.div`
  width: 630px;
  height: 222px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 24px 24px;
`;

export const GrassTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GrassYearWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  column-gap: 16px;
  align-items: center;
`;

export const GrassYear = styled.div<{
  selected?: boolean;
}>`
  font-size: 16px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  align-items: center;
  color: ${props => (props.selected ? `${G.PALETTE.MAIN_WHITE}` : `${G.PALETTE.LIGHT_BLACK}`)};
  background-color: ${props => (props.selected ? `${G.PALETTE.MAIN_COLOR}` : 'white')};
`;

export const Font = styled.div<FontOption>`
  font-size: ${({ $size }) => $size};
  font-weight: ${({ $weight }) => $weight};
`;

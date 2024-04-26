import styled from 'styled-components';

interface FontOption {
  size: string;
  weight: string;
}

export const SideBarWrapper = styled.div`
  width: 260px;
  height: 100vh;
  padding: 16px 0px;
  row-gap: 24px;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
`;

export const SideBarProfile = styled.div`
  column-gap: 14px;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
`;

export const SideBarProfilePhoto = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: row;
  background-color: red;
`;

export const SideBarProfileName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const SideBarNavList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const SideBarNavMain = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const SideBarMyProject = styled(SideBarNavMain)`
  row-gap: 10px;
`;

export const SideBarContents = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 12px;
  column-gap: 10px;
`;

export const SideBarTitle = styled(SideBarContents)`
  justify-content: space-between;
  border-bottom: solid 1px black;
`;

export const SideBarFont = styled.div<FontOption>`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
`;

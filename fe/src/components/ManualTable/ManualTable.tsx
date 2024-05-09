import React, { useCallback, useEffect } from 'react';
import * as S from './ManualTableStyle';
import * as T from '@types';
import * as Sub from './Subs';
import * as Icon from '@assets';
import { useWebSocket } from '@/providers/SocketProvider';
import { Plus } from 'lucide-react';
import { PALETTE } from '@/styles';

const READY_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export default function ManualTable({ columnTitles, dataList, usingFor }: T.ManualTableProps) {
  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', event => {
        if (event.target && socket.readyState === READY_STATE.OPEN) {
          const messageObject = { username: `멀티버스 김성제 - ${Math.random()}`, message: '입장했습니다.' };
          console.log(`OPEN :`, READY_STATE.OPEN);
          socket.send(JSON.stringify(messageObject));
        }
      });
      socket.addEventListener('message', event => {
        if (event.target && socket.readyState === READY_STATE.OPEN) {
          console.log(`MESSAGE :`, event);
        }
      });
    }
  }, [socket]);

  const createIconUsingIconName = useCallback(({ idx }: { idx: number }) => {
    if (columnTitles[idx].iconName === 'main-title-icon') {
      return <Icon.MainTitle />;
    }
    if (columnTitles[idx].iconName === 'current-state-title') {
      return <Icon.CurrentStateTitle />;
    }
    if (columnTitles[idx].iconName === 'text-content-title') {
      return <Icon.TextContentTitle />;
    }
  }, []);

  return (
    <S.TableWrapper>
      <S.TableContainer>
        <S.TitleRowWrapper>
          {columnTitles.map((title, titleIdx) => (
            <S.Title $fixedWidth={columnTitles[titleIdx].fixedWidth} key={`title-${title.name}-${titleIdx}`}>
              {createIconUsingIconName({ idx: titleIdx })}
              <span>{title.name}</span>
            </S.Title>
          ))}
        </S.TitleRowWrapper>
        {dataList.map((data, dataIdx) => (
          <S.RowWrapper key={`${usingFor}-table-row-${dataIdx}`}>
            {Object.keys(data).map((dataObjKey, dataObjKeyIdx) =>
              columnTitles[dataObjKeyIdx].celType === 'TEXT' ? (
                <Sub.TextAreaCel
                  fixedWidth={columnTitles[dataObjKeyIdx].fixedWidth}
                  initialState={dataList[dataIdx][dataObjKey]}
                  key={`${usingFor}-table-cell-${dataObjKey}-${dataIdx}`}
                />
              ) : (
                <Sub.SelectCel
                  fixedWidth={columnTitles[dataObjKeyIdx].fixedWidth}
                  initialState={dataList[dataIdx][dataObjKey]}
                  usingFor={dataObjKey.toUpperCase() as 'PRIORITY' | 'STATE' | 'ASSIGNEES' | 'METHOD'}
                  key={`${usingFor}-table-cell-${dataObjKey}-${dataIdx}`}
                />
              ),
            )}
          </S.RowWrapper>
        ))}
      </S.TableContainer>
      <S.CreateNewRowButton>
        <Plus color={PALETTE.LIGHT_BLACK} size={14}></Plus>
        <span>작업 추가</span>
      </S.CreateNewRowButton>
    </S.TableWrapper>
  );
}

const FIXED_WIDTH = {
  API: ['200px', '120px', '120px', '200px', '312px', '172px', '172px', '136px', '136px', '160px'],
  FEATURE: ['200px', '200px', '120px', '200px', '312px', '120px', '160px', '160px', '160px'],
};

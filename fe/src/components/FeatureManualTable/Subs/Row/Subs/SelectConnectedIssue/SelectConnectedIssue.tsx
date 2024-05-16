import React, { useMemo, useRef } from 'react';
import * as S from './SelectConnectedIssueStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Comp from '@components';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PALETTE } from '@/styles';

export default function SelectConnectedIssue({
  initialState,
  fixedWidth,
  readonly,
  onCreate,
  onDelete,
}: T.FeatureSelectConnectedIssueCelProps) {
  const { projectId } = useParams();
  const celRef = useRef<HTMLDivElement>(null);
  const alreadyConnected = useMemo(() => {
    return initialState.map(state => state.id);
  }, [initialState]);

  const { data: screenIssuesResponse, isFetching: isMembersResponseFeting } = useQuery({
    queryKey: [{ func: `get-screen-issue-list`, projectId }],
    queryFn: () => API.project.getScreenIssueList({ projectId: Number(projectId) }),
  });

  const handleCelClick = (toggledValue: boolean) => {
    if (celRef.current === null || readonly) return;

    if (toggledValue) celRef.current.focus();
    else celRef.current.blur();
  };

  const handleListOptionClick = ({ id }: { id: number }) => {
    if (readonly) return;

    onCreate({ screenIssueId: id });
    celRef.current?.blur();
    handleCelClick(false);
  };

  return (
    <S.Wrapper
      className="hover-bg-dark"
      onClick={() => handleCelClick(true)}
      onFocus={() => handleCelClick(true)}
      onBlur={() => handleCelClick(false)}
      $fixedWidth={fixedWidth}
      disabled={readonly}
    >
      <S.Placeholder>
        {initialState
          .sort((x1, x2) => x1.id - x2.id)
          .map((el, i) => (
            <S.ScreenIssueWrapper key={`assignees-${el.id}-${i}`}>
              {el.issueName}
              <span onClick={() => !readonly && onDelete({ connectionId: el.connectionId as number })}>
                <X size={12} color={PALETTE.LIGHT_BLACK} />
              </span>
            </S.ScreenIssueWrapper>
          ))}
      </S.Placeholder>
      <S.OptionUlWrapper>
        {screenIssuesResponse?.data.map((res, idx) => {
          return (
            !alreadyConnected.includes(res.id) && (
              <S.OptionLi
                className="hover-bg-dark"
                aria-valuetext={res.issueName}
                key={`assignees-li-${res.id}-${idx}`}
                onClick={() => handleListOptionClick({ id: res.id })}
              >
                <span>{res.issueName}</span>
              </S.OptionLi>
            )
          );
        })}
      </S.OptionUlWrapper>
    </S.Wrapper>
  );
}

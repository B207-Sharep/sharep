import React, { useEffect, useState } from 'react';
import * as S from './IssueStyle';
import * as T from '@types';
import * as Comp from '@components';
import { MoreVertical, GitCommit } from 'lucide-react';
import { PALETTE } from '@/styles';

export default function Issue({ name, commit, assignees, priority, dragAble }: T.IssueProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleIsHolding = (toggleValue: boolean) => {
    setIsHolding(toggleValue);
  };

  const handleCursorPosition = (e: React.MouseEvent) => {
    console.log(`e.X :`, e.clientX, `| e.Y :`, e.clientY);
    if (isHolding) setCursorPosition(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  useEffect(() => {
    console.log(`isHolding :`, isHolding);
    console.log(dragAble);
  }, [isHolding, dragAble]);

  return (
    <S.RelativeWrapper>
      <S.DragAbleContainer
        // onMouseUp={() => handleIsHolding(false)}
        // onMouseDown={() => handleIsHolding(true)}
        onMouseOver={handleCursorPosition}
        $isHolding={isHolding}
        $position={{ x: cursorPosition.x, y: cursorPosition.y }}
      >
        <S.TitleWrapper>
          <span aria-label={name}>{name}</span>
          <MoreVertical size={24} color={PALETTE.LIGHT_BLACK} />
        </S.TitleWrapper>
        <S.RecentlyCommit>
          {commit !== null && (
            <>
              <GitCommit size={16} color={PALETTE.LIGHT_BLACK} />
              <span aria-label={commit.title}>{commit.title}</span>
              <span>{commit.createAt}</span>
            </>
          )}
        </S.RecentlyCommit>
        <S.AboutEtcWrapper>
          <S.PriorityWrapper>
            <span>우선 순위</span>
            <Comp.PriorityBadge priority={priority} />
          </S.PriorityWrapper>
          <S.AssignessWrapper $assigneesNumber={assignees.length}>
            {assignees.map((user, idx) => (
              <S.UserImgWrapper key={`assignees-${user.name}-${idx}`} $idx={idx} aria-label={user.name}>
                <Comp.UserImg size="24px" path={user.url} />
              </S.UserImgWrapper>
            ))}
          </S.AssignessWrapper>
        </S.AboutEtcWrapper>
      </S.DragAbleContainer>
    </S.RelativeWrapper>
  );
}

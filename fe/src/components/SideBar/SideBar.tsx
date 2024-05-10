import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './SideBarStyle';
import { History as CommitHistory, Plus } from 'lucide-react';
import * as G from '@/styles';
import * as Comp from '@/components';
import * as T from '@/types';
import API from '@/assets/svgs/api-docs-icon.svg?react';
// import ETC from '../../../public/svgs/etc-docs-icon.svg?react';
import INFRA from '@/assets/svgs/infra-docs-icon.svg?react';
import MY from '@/assets/svgs/my-dashboard-icon.svg?react';
import PLAN from '@/assets/svgs/plan-docs-icon.svg?react';
import SCREEN from '@/assets/svgs/screen-definition-icon.svg?react';
import TEAM from '@/assets/svgs/team-dashboard-icon.svg?react';
import NOTI from '@/assets/svgs/noti.svg?react';
import UserImg from '../UserImg/UserImg';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { userState } from '@/stores/atoms/loadUser';

export default function SideBar() {
  const navigate = useNavigate();
  const jobModal = useModal('job');
  const [showNoti, setShowNoti] = useState(false);
  const user = useRecoilValue(userState);
  const { projectId, accountId } = useParams();

  const handleHistoryClick = () => {
    navigate(`/projects/${projectId}/commit-history`);
  };
  const handleMyProfileClick = () => {
    navigate('/projects');
  };

  const handleTeamDashClick = () => {
    navigate(`/projects/${projectId}`);
  };
  const handleMyDashClick = () => {
    navigate(`/projects/${projectId}/members/${user?.id}`);
  };
  const handleFeatureManualClick = () => {
    navigate(`/projects/${projectId}/feature-manual`);
  };
  const handleAPIClick = () => {
    navigate(`/projects/${projectId}/api-manual`);
  };
  const handleScreenClick = () => {
    navigate(`/projects/${projectId}/screen-manual`);
  };
  const handleInfraClick = () => {
    navigate(`/projects/${projectId}/infra-manual`);
  };

  const handleModalOpen = () => {
    jobModal.openModal({
      name: '',
      imageFile: null,
      description: '',
    });
  };

  const handleNotiClick = (noti: T.NotiProps) => () => {
    console.log(noti);
  };

  return (
    <>
      <S.SideBarWrapper>
        <S.SideBarProfile className="hover-bg-dark" onClick={handleMyProfileClick}>
          <UserImg size="md" path={user?.imageUrl} />
          <S.SideBarProfileName>
            <S.SideBarFont $size="20px" $weight={700}>
              {user?.nickname}
            </S.SideBarFont>
            <S.SideBarFont $size="12px" $weight={400}>
              {user?.email}
            </S.SideBarFont>
          </S.SideBarProfileName>
        </S.SideBarProfile>
        <S.SideBarNavList>
          <S.SideBarNavMain>
            {/* 내프로젝트영역 */}
            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont $size="18px" $weight={700}>
                  Share.P
                </S.SideBarFont>
                <S.SideBarBtnGroup>
                  <S.SideBarBtn onClick={handleHistoryClick}>
                    <CommitHistory color={G.PALETTE.MAIN_COLOR} size={14}></CommitHistory>
                  </S.SideBarBtn>
                  <S.SideBarBtn onClick={handleModalOpen}>
                    <Plus color={G.PALETTE.MAIN_COLOR} size={14}></Plus>
                  </S.SideBarBtn>
                  <Comp.Modal modalId="job" title="새 작업 작성">
                    <Comp.JobCreationForm modalId="job" />
                  </Comp.Modal>
                </S.SideBarBtnGroup>
              </S.SideBarTitle>
              <S.SideBarContents className="hover-bg-dark" onClick={handleTeamDashClick}>
                <TEAM />
                <S.SideBarFont $size="14px" $weight={400}>
                  팀 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleMyDashClick}>
                <MY></MY>
                <S.SideBarFont $size="14px" $weight={400}>
                  나의 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
            {/* 내프로젝트끝 */}
            {/* 명세서영역시작 */}
            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont $size="18px" $weight={700}>
                  주요 명세서
                </S.SideBarFont>
              </S.SideBarTitle>
              <S.SideBarContents className="hover-bg-dark" onClick={handleFeatureManualClick}>
                <PLAN></PLAN>
                <S.SideBarFont $size="14px" $weight={400}>
                  기능 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleAPIClick}>
                <API></API>
                <S.SideBarFont $size="14px" $weight={400}>
                  API 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleScreenClick}>
                <SCREEN></SCREEN>
                <S.SideBarFont $size="14px" $weight={400}>
                  화면 정의서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleInfraClick}>
                <INFRA></INFRA>
                <S.SideBarFont $size="14px" $weight={400}>
                  인프라 명세서
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
          </S.SideBarNavMain>
          <S.SideBarContents className="hover-bg-dark" onClick={() => setShowNoti(!showNoti)}>
            <S.NotiDropdownContainer>
              <NOTI></NOTI>
              <S.SideBarFont $size="12px" $weight={400}>
                알림
              </S.SideBarFont>
              <S.NotiDropdownContent $show={showNoti}>
                <S.NotiDropdownHeader>
                  <S.StyledText color={G.PALETTE.SUB_BLACK} fontSize={16} fontWeight={700}>
                    알림 목록
                  </S.StyledText>
                </S.NotiDropdownHeader>
                {dummyNoti.map(noti => (
                  <S.NotiItem key={noti.id} $unread={noti.unread} onClick={handleNotiClick(noti)}>
                    <S.NotiMessage>
                      <S.NotiIcon>
                        {noti.type === 'FEATURE' ? <PLAN /> : noti.type === 'SCREEN' ? <SCREEN /> : <INFRA />}
                        {noti.unread && <S.UnReadMark />}
                      </S.NotiIcon>
                      <S.NotiMessageContent>
                        <S.StyledText color={noti.unread ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK}>
                          {noti.message}
                        </S.StyledText>
                        <S.StyledText color={noti.unread ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK} fontSize={10}>
                          {noti.createdAt}
                        </S.StyledText>
                      </S.NotiMessageContent>
                    </S.NotiMessage>
                    <S.NotiUserInfo>
                      <S.StyledText color={noti.unread ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK} fontSize={12}>
                        {noti.member.nickname}
                      </S.StyledText>
                      <S.RoleBadgeList>
                        {noti.member.roles.map((role, index) => (
                          <Comp.RoleBadge key={index} role={role} selectAble={false} />
                        ))}
                      </S.RoleBadgeList>
                    </S.NotiUserInfo>
                  </S.NotiItem>
                ))}
              </S.NotiDropdownContent>
            </S.NotiDropdownContainer>
          </S.SideBarContents>
        </S.SideBarNavList>
      </S.SideBarWrapper>
    </>
  );
}

const dummyNoti: T.NotiProps[] = [
  {
    id: 1,
    issueId: 1,
    type: 'FEATURE',
    message: '기능 명세 #1 수정',
    unread: true,
    createdAt: '2024-05-05',
    member: {
      memberId: 1,
      nickname: '이승민',
      roles: ['BACK_END', 'INFRA'] as Extract<T.RoleBadgeProps, 'role'>[],
    },
  },
  {
    id: 2,
    issueId: 2,
    type: 'SCREEN',
    message: '화면 정의 #메인 페이지 수정',
    unread: false,
    createdAt: '2024-05-04',
    member: {
      memberId: 1,
      nickname: '김성제',
      roles: ['FRONT_END'] as Extract<T.RoleBadgeProps, 'role'>[],
    },
  },

  {
    id: 3,
    issueId: 3,
    type: 'INFRA',
    message: '인프라 명세 #1 수정',
    unread: true,
    createdAt: '2024-05-03',
    member: {
      memberId: 1,
      nickname: '오상훈',
      roles: ['BACK_END', 'INFRA'] as Extract<T.RoleBadgeProps, 'role'>[],
    },
  },
];

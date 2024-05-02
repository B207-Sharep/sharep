import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './SideBarStyle';
import { History as CommitHistory, Plus } from 'lucide-react';
import * as G from '@/styles';

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
import { Modal } from '..';
import { TaskCreationForm } from '../Modal/Subs';

export default function SideBar() {
  const navigate = useNavigate();
  const taskModal = useModal('task');

  const handleHistoryClick = () => {
    navigate('/1/history');
  };

  const handleTeamDashClick = () => {
    navigate('/teamid/teamdash');
  };
  const handleMyDashClick = () => {
    navigate('/teamid/mydash');
  };
  const handleFeatureManualClick = () => {
    navigate('/1/feature-manual');
  };
  const handleAPIClick = () => {
    navigate('/teamid/api');
  };
  const handleScreenClick = () => {
    navigate('/1/screen-manual');
  };
  const handleInfraClick = () => {
    navigate('/1/infra-manual');
  };

  const handleModalOpen = () => {
    taskModal.openModal({
      name: '',
      imageUrl: '',
      description: '',
    });
  };
  return (
    <>
      <S.SideBarWrapper>
        <S.SideBarProfile>
          <UserImg size="md" path={'/youjack.png'} />
          <S.SideBarProfileName>
            <S.SideBarFont $size="24px" $weight={700}>
              유잭건
            </S.SideBarFont>
            <S.SideBarFont $size="16px" $weight={400}>
              @jackU
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
                  <Modal modalId="task" title="새 작업 작성">
                    <TaskCreationForm modalId="task" />
                  </Modal>
                </S.SideBarBtnGroup>
              </S.SideBarTitle>
              <S.SideBarContents className="hover-bg-dark" onClick={handleTeamDashClick}>
                <TEAM />
                <S.SideBarFont $size="14px" $weight={200}>
                  팀 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleMyDashClick}>
                <MY></MY>
                <S.SideBarFont $size="14px" $weight={200}>
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
                <S.SideBarFont $size="14px" $weight={200}>
                  기능 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleAPIClick}>
                <API></API>
                <S.SideBarFont $size="14px" $weight={200}>
                  API 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleScreenClick}>
                <SCREEN></SCREEN>
                <S.SideBarFont $size="14px" $weight={200}>
                  화면 정의서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark" onClick={handleInfraClick}>
                <INFRA></INFRA>
                <S.SideBarFont $size="14px" $weight={200}>
                  인프라 명세서
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
          </S.SideBarNavMain>
          <S.SideBarContents className="hover-bg-dark">
            <NOTI></NOTI>
            <S.SideBarFont $size="12px" $weight={200}>
              알림
            </S.SideBarFont>
          </S.SideBarContents>
        </S.SideBarNavList>
      </S.SideBarWrapper>
    </>
  );
}

// import React from 'react';
import * as S from './SideBarStyle';
import { History, Plus } from 'lucide-react';
import * as G from '@/styles';

import API from '@/assets/svgs/api-docs-icon.svg?react';
// import ETC from '../../../public/svgs/etc-docs-icon.svg?react';
import INFRA from '@/assets/svgs/infra-docs-icon.svg?react';
import MY from '@/assets/svgs/my-dashboard-icon.svg?react';
import PLAN from '@/assets/svgs/plan-docs-icon.svg?react';
import SCREEN from '@/assets/svgs/screen -definition-icon.svg?react';
import TEAM from '@/assets/svgs/team-dashboard-icon.svg?react';
import NOTI from '@/assets/svgs/noti.svg?react';

export default function SideBar() {
  return (
    <>
      <S.SideBarWrapper>
        <S.SideBarProfile>
          <S.SideBarProfilePhoto></S.SideBarProfilePhoto>
          <S.SideBarProfileName>
            <S.SideBarFont size="24px" weight={700}>
              김성제
            </S.SideBarFont>
            <S.SideBarFont size="16px" weight={400}>
              @ssafy
            </S.SideBarFont>
          </S.SideBarProfileName>
        </S.SideBarProfile>
        <S.SideBarNavList>
          <S.SideBarNavMain>
            {/* 내프로젝트영역 */}
            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont size="18px" weight={700}>
                  Share.P
                </S.SideBarFont>
                <S.SideBarBtnGroup>
                  <S.SideBarBtn>
                    <History color={G.PALETTE.MAIN_COLOR} size={14}></History>
                  </S.SideBarBtn>
                  <S.SideBarBtn>
                    <Plus color={G.PALETTE.MAIN_COLOR} size={14}></Plus>
                  </S.SideBarBtn>
                </S.SideBarBtnGroup>
              </S.SideBarTitle>
              <S.SideBarContents className="hover-bg-dark">
                <TEAM />
                <S.SideBarFont size="14px" weight={200}>
                  팀 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark">
                <MY></MY>
                <S.SideBarFont size="14px" weight={200}>
                  나의 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
            {/* 내프로젝트끝 */}
            {/* 명세서영역시작 */}

            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont size="18px" weight={700}>
                  주요 명세서
                </S.SideBarFont>
              </S.SideBarTitle>
              <S.SideBarContents className="hover-bg-dark">
                <PLAN></PLAN>
                <S.SideBarFont size="14px" weight={200}>
                  기능 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark">
                <API></API>
                <S.SideBarFont size="14px" weight={200}>
                  API 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark">
                <SCREEN></SCREEN>
                <S.SideBarFont size="14px" weight={200}>
                  화면 정의서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents className="hover-bg-dark">
                <INFRA></INFRA>
                <S.SideBarFont size="14px" weight={200}>
                  인프라 명세서
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
          </S.SideBarNavMain>
          <S.SideBarContents className="hover-bg-dark">
            <NOTI></NOTI>
            <S.SideBarFont size="12px" weight={200}>
              알림
            </S.SideBarFont>
          </S.SideBarContents>
        </S.SideBarNavList>
      </S.SideBarWrapper>
    </>
  );
}

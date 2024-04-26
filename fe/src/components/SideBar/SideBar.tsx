import React from 'react';
import * as S from './SideBarStyle';

export default function SideBar() {
  return (
    <>
      <S.SideBarWrapper>
        <S.SideBarProfile>
          <S.SideBarProfilePhoto></S.SideBarProfilePhoto>
          <S.SideBarProfileName>
            <S.SideBarFont size="24px" weight="bold">
              김성제
            </S.SideBarFont>
            <S.SideBarFont size="16px" weight="400">
              @ssafy
            </S.SideBarFont>
          </S.SideBarProfileName>
        </S.SideBarProfile>
        <S.SideBarNavList>
          <S.SideBarNavMain>
            {/* 내프로젝트영역 */}
            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont size="18px" weight="bold">
                  Share.P
                </S.SideBarFont>
                <div>
                  <button>버튼1</button>
                  <button>버튼2</button>
                </div>
              </S.SideBarTitle>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  팀 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  나의 대시보드
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
            {/* 내프로젝트끝 */}
            {/* 명세서영역시작 */}

            <S.SideBarMyProject>
              <S.SideBarTitle>
                <S.SideBarFont size="18px" weight="bold">
                  주요 명세서
                </S.SideBarFont>
              </S.SideBarTitle>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  기능 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  API 명세서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  화면 정의서
                </S.SideBarFont>
              </S.SideBarContents>
              <S.SideBarContents>
                <S.SideBarFont size="14px" weight="200">
                  인프라 명세서
                </S.SideBarFont>
              </S.SideBarContents>
            </S.SideBarMyProject>
          </S.SideBarNavMain>
          <S.SideBarContents>
            <S.SideBarFont size="12px" weight="200">
              알림
            </S.SideBarFont>
          </S.SideBarContents>
        </S.SideBarNavList>
      </S.SideBarWrapper>
    </>
  );
}

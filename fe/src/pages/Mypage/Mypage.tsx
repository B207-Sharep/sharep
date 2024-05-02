import { NoneSideBarLayout } from '@/layouts';
import * as S from './MypageStyle';
import * as G from '@/styles';
import * as API from '@/apis/projects';
import { GalleryGridWrapper, UserImg } from '@/components';
import ProjectGridWrapper from '@/components/ProjectGridWrapper/ProjectGridWrapper';

//DUMMY
import JD from '../../../public/lee-jae-yong.png';
import UIMG from '../../../public/youjack.png';
import Grass from '@/components/Grass/Grass';
import * as Comp from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const issueList = [
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `${index + 1} 페이지`,
    title: 'SCREEN',
    bio: 'Lorem ipsum',
    accounts: ['/youjack.png', '/lee-jae-yong.png'],
    createdAt: '2024.04.27',
    add: false,
  })),
];
//이건 add 추가
const modifiedIssueList = issueList.map(issue => ({
  ...issue,
  add: false,
}));

export default function Mypage() {
  const [clickedYear, setClickedYear] = useState(2024);
  //   useEffect(() => console.log(clickedYear, 'CY'), [clickedYear]);
  const {
    data: projectListResponse,
    isFetched: projectListFetched,
    isPending: projectListPending,
  } = useQuery({
    queryKey: [{ projectList: `projectList` }],
    queryFn: () =>
      API.getProjectList().then(res => {
        let modires = [];
        if (res.status === 204) {
          console.log('HI');
          return { projectListResponse: '' };
        } else {
          modires = res.data.map((issue: any) => ({
            ...issue,
            add: false,
          }));
          console.log('WHAT? ', modires);
        }

        return modires;
      }),
    retry: false,
    // enabled: !!initalflag,
  });

  const {
    data: grassResponse,
    isFetched: grassFetched,
    isPending: grassPending,
  } = useQuery({
    queryKey: [{ grass: `grass` }],
    queryFn: () =>
      API.getGrass().then(res => {
        if (res.status === 204) {
          console.log('HI');
          return { grassResponse: '' };
        } else {
          console.log('grass? ', res.data);
        }

        return res.data;
      }),
    retry: false,
    // enabled: !!initalflag,
  });

  return (
    <>
      <NoneSideBarLayout>
        <S.Wrapper>
          <S.HeaderWrapper>
            <S.ProfileWrapper>
              <Comp.UserImg size="lg" path={'/youjack.png'} />

              <S.ProfileTextWrapper>
                <S.Font $size="24px" $weight="600">
                  유재건
                </S.Font>

                <S.Font $size="16px" $weight="400" style={{ color: `${G.PALETTE.LIGHT_BLACK}` }}>
                  @jackU
                </S.Font>
              </S.ProfileTextWrapper>
            </S.ProfileWrapper>
            <S.GrassWrapper>
              <S.GrassTextWrapper>
                <S.Font $size="20px" $weight="700">
                  잔디
                </S.Font>
                <S.GrassYearWrapper>
                  <S.GrassYear>{clickedYear}</S.GrassYear>
                  {/* {years?.map((year, idx) => (
                    <S.GrassYear
                      key={idx}
                      onClick={() => setClickedYear(idx)}
                      selected={idx === clickedYear ? true : false}
                    >
                      {year}
                    </S.GrassYear>
                  ))} */}
                </S.GrassYearWrapper>
              </S.GrassTextWrapper>
              {grassFetched ? (
                <>
                  <S.GrassHeader>
                    <S.Font $size="16px" $weight="400">
                      {grassResponse.jobCount}개의 작업
                    </S.Font>
                    <S.GrassStep>
                      <S.Font $size="12px" $weight="400">
                        단계
                      </S.Font>
                      <></>
                    </S.GrassStep>
                  </S.GrassHeader>
                  <Grass grass={grassResponse} />
                </>
              ) : (
                <></>
              )}
            </S.GrassWrapper>
          </S.HeaderWrapper>
          {projectListFetched ? <ProjectGridWrapper issueList={projectListResponse}></ProjectGridWrapper> : <></>}
        </S.Wrapper>
      </NoneSideBarLayout>
    </>
  );
}

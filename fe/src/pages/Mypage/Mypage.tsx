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
    imgs: ['/youjack.png', '/lee-jae-yong.png'],
    createdAt: '2024.04.27',
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
  //   const {
  //     data: projectListResponse,
  //     isFetched: projectListFetched,
  //     isPending: projectListPending,
  //   } = useQuery({
  //     queryKey: [{ projectList: `projectList` }],
  //     queryFn: () =>
  //       API.getProjectList().then(res => {
  //         if (res.status === 204) {
  //           console.log('HI');
  //           return { projectResponse: '' };
  //         } else {
  //           console.log('WHAT? ', res);
  //         }
  //         return res.data;
  //       }),
  //     retry: false,
  //     // enabled: !!initalflag,
  //   });

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
              <Grass />
            </S.GrassWrapper>
          </S.HeaderWrapper>
          <ProjectGridWrapper issueList={modifiedIssueList}></ProjectGridWrapper>
          {/* <GallPreryGridWrapper issueList={issueList}></GallPreryGridWrapper> */}
          {/* <ProjectGridWrapper>
            <div>dd</div>
            <div>dd</div>
            <div>dd</div>
          </ProjectGridWrapper> */}
        </S.Wrapper>
      </NoneSideBarLayout>
    </>
  );
}

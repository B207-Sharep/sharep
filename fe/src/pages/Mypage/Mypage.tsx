import { NoneSideBarLayout } from '@/layouts';
import * as S from './MypageStyle';
import * as G from '@/styles';
import { UserImg } from '@/components';

//DUMMY
import UIMG from '@/assets/imgs/youjack.png';

export default function Mypage() {
  return (
    <>
      <NoneSideBarLayout>
        <S.Wrapper>
          <S.HeaderWrapper>
            <S.ProfileWrapper>
              <UserImg size="lg" path={UIMG} />
              <S.ProfileTextWrapper>
                <S.Font $size="24px" $weight="600">
                  유재건
                </S.Font>

                <S.Font $size="16px" $weight="400" style={{ color: `${G.PALETTE.LIGHT_BLACK}` }}>
                  @jackU
                </S.Font>
              </S.ProfileTextWrapper>
            </S.ProfileWrapper>
            <S.GrassWrapper>잔디밭</S.GrassWrapper>
          </S.HeaderWrapper>
        </S.Wrapper>
      </NoneSideBarLayout>
    </>
  );
}

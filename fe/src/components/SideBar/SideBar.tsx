import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './SideBarStyle';
import { History as CommitHistory, Plus, LogOut } from 'lucide-react';
import * as G from '@/styles';
import * as Comp from '@/components';
import * as T from '@/types';
import * as API from '@/apis';
import APIIcon from '@/assets/svgs/api-docs-icon.svg?react';
// import ETC from '../../../public/svgs/etc-docs-icon.svg?react';
import INFRA from '@/assets/svgs/infra-docs-icon.svg?react';
import MY from '@/assets/svgs/my-dashboard-icon.svg?react';
import PLAN from '@/assets/svgs/plan-docs-icon.svg?react';
import SCREEN from '@/assets/svgs/screen-definition-icon.svg?react';
import TEAM from '@/assets/svgs/team-dashboard-icon.svg?react';
import NOTI from '@/assets/svgs/noti.svg?react';
import UserImg from '../UserImg/UserImg';
import { useModal } from '@/customhooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/stores/atoms/loadUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default function SideBar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const jobModal = useModal('job');
  const [showNoti, setShowNoti] = useState(false);
  const [notifications, setNotifications] = useState<T.API.GetNotificationListResponse[]>([]);
  const [unreadNoti, setUnreadNoti] = useState<number | null>(null);
  const user = useRecoilValue(userState);
  const { projectId } = useParams();
  const setUserState = useSetRecoilState(userState);

  const {
    data: projectInfoResponse,
    isSuccess: projectInfoSuccess,
    isFetched: projectInfoFetched,
    isPending: projectInfoPending,
  } = useQuery({
    queryKey: [{ func: `projectList`, projectId }],
    queryFn: () => API.project.getProjectList(),
    select: data => data.data.find(project => project.id === Number(projectId)),
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const url = `${import.meta.env.VITE_END_POINT}/notifications/projects/${projectId}/accounts/subscriptions`;

    if (!token) return;

    const eventSourceInit = () =>
      new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    let eventSource = eventSourceInit();

    const onMessage = (event: any) => {
      const { data } = event;
      const notificationList = JSON.parse(data);

      const count = notificationList.filter((noti: T.API.GetNotificationListResponse) => noti.isRead === false).length;

      setNotifications(notificationList);
      setUnreadNoti(count);
    };

    const onError = () => {
      eventSource.close();
      setTimeout(() => {
        eventSource = eventSourceInit();
        setupEventSource(eventSource);
      }, 1000);
    };

    const setupEventSource = (es: EventSourcePolyfill) => {
      es.addEventListener('sse', onMessage);
      es.onerror = onError;
    };

    setupEventSource(eventSource);

    return () => {
      eventSource.close();
    };
  }, [projectId]);

  const readNotiMutation = useMutation({
    mutationKey: [{ func: `read-noti` }],
    mutationFn: API.project.readNoti,
  });

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

  const handleNotiClick = (noti: T.API.GetNotificationListResponse) => (event: React.MouseEvent) => {
    console.log(noti);
    event.stopPropagation();
    if (noti) {
      readNotiMutation.mutate(
        {
          notificationId: noti.notificationId,
        },
        {
          onSuccess: () => {
            setNotifications(prev =>
              prev.map(notification =>
                notification.notificationId === noti.notificationId ? { ...notification, isRead: true } : notification,
              ),
            );

            setUnreadNoti(prev => (prev !== null ? prev - 1 : 0));
          },
        },
      );
    } else throw Error;
  };

  const logoutClick = () => {
    localStorage.removeItem('token');
    setUserState(null);
    navigate('/');
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
                  {projectInfoSuccess && projectInfoResponse && projectInfoResponse.title}
                </S.SideBarFont>
                <S.SideBarBtnGroup>
                  <S.TooltipContainer>
                    <S.SideBarBtn onClick={handleHistoryClick}>
                      <CommitHistory color={G.PALETTE.MAIN_COLOR} size={14}></CommitHistory>
                    </S.SideBarBtn>
                    <S.TooltipText>작업 기록</S.TooltipText>
                  </S.TooltipContainer>

                  <S.TooltipContainer>
                    <S.SideBarBtn onClick={handleModalOpen}>
                      <Plus color={G.PALETTE.MAIN_COLOR} size={14}></Plus>
                    </S.SideBarBtn>
                    <S.TooltipText>새 작업 생성</S.TooltipText>
                  </S.TooltipContainer>

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
                <APIIcon></APIIcon>
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
          <S.SideBarContents>
            <S.NotiDropdownContainer className="hover-bg-dark" onClick={() => setShowNoti(!showNoti)}>
              <NOTI></NOTI>
              <S.SideBarFont $size="14px" $weight={400}>
                알림
              </S.SideBarFont>
              {unreadNoti && unreadNoti > 0 && (
                <S.UnReadMessage>{unreadNoti >= 100 ? `99+` : unreadNoti}</S.UnReadMessage>
              )}

              <S.NotiDropdownContent $show={showNoti}>
                <S.NotiDropdownHeader>
                  <S.StyledText color={G.PALETTE.SUB_BLACK} fontSize={16} fontWeight={700}>
                    알림 목록
                  </S.StyledText>
                </S.NotiDropdownHeader>
                {notifications &&
                  notifications.map(noti => (
                    <S.NotiItem key={noti.notificationId} $isRead={noti.isRead} onClick={handleNotiClick(noti)}>
                      <S.NotiMessage>
                        <S.NotiIcon>
                          {noti.type === 'FEATURE' ? <PLAN /> : noti.type === 'SCREEN' ? <SCREEN /> : <INFRA />}
                          {!noti.isRead && <S.UnReadMark />}
                        </S.NotiIcon>
                        <S.NotiMessageContent>
                          <S.StyledText color={!noti.isRead ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK}>
                            {noti.message}
                          </S.StyledText>
                          <S.StyledText
                            color={!noti.isRead ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK}
                            fontSize={10}
                          >
                            {noti.finishedAt && dayjs(noti.finishedAt).locale('ko').fromNow()}
                          </S.StyledText>
                        </S.NotiMessageContent>
                      </S.NotiMessage>
                      <S.NotiUserInfo>
                        <S.StyledText color={noti.isRead ? G.PALETTE.SUB_BLACK : G.PALETTE.LIGHT_BLACK} fontSize={12}>
                          {noti.nickname}
                        </S.StyledText>
                        <S.RoleBadgeList>
                          {noti.roles.map((role, index) => (
                            <Comp.RoleBadge key={index} role={role} selectAble={false} />
                          ))}
                        </S.RoleBadgeList>
                      </S.NotiUserInfo>
                    </S.NotiItem>
                  ))}
              </S.NotiDropdownContent>
            </S.NotiDropdownContainer>
            <LogOut onClick={logoutClick} style={{ cursor: 'pointer' }}></LogOut>
          </S.SideBarContents>
        </S.SideBarNavList>
      </S.SideBarWrapper>
    </>
  );
}

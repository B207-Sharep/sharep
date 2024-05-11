import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as L from '@/layouts';
import * as Comp from '@/components';
import * as T from '@/types';
import * as S from './ScreenManualDetailStyle';
import * as API from '@/apis';
import { useNavigate, useParams } from 'react-router-dom';
import { PALETTE } from '@/styles';
import { useModal } from '@/customhooks';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, X, XCircle } from 'lucide-react';

export default function ScreenManualDetail() {
  const queryClient = useQueryClient();
  const { projectId, manualId } = useParams();
  const navigate = useNavigate();
  const jobModal = useModal('job');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addbBtnRef = useRef<HTMLDivElement | null>(null);

  const [
    {
      data: screenIssueDetailResponse,
      isSuccess: screenIssueDetailSuccess,
      isFetching: screenIssueDetailLoading,
      refetch: screenIssueDetailRefetch,
    },
    { data: memberListResponse, isSuccess: memberListSuccess, isFetching: memberListFetching },
    { data: jobListResponse, isSuccess: jobListSuccess, isFetching: jobListeFetching, refetch: jobListRefetch },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-screen-issue-detail`, projectId, manualId }],
        queryFn: () => API.project.getScreenIssueDetail({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-member-list`, projectId }],
        queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-job-list`, projectId, manualId }],
        queryFn: () =>
          API.project.getJobList({
            projectId: Number(projectId),
            accountId: null,
            issueId: null,
            roleType: null,
          }),
      },
    ],
  });

  const createIssueAssigneeMutation = useMutation({
    mutationKey: [{ func: `create-issue-assignee`, projectId, manualId }],
    mutationFn: API.project.createIssueAssignee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ func: `get-screen-issue-detail`, projectId, manualId }] });
    },
  });

  const deleteIssueAssigneeMutation = useMutation({
    mutationFn: API.project.deleteIssueAssignees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ func: `get-screen-issue-detail`, projectId, manualId }] });
    },
  });

  const selectedIssueDetail = useMemo(
    () => screenIssueDetailResponse && screenIssueDetailResponse.data.find(issue => issue.id === Number(manualId)),
    [screenIssueDetailResponse, manualId],
  );

  const recentJob = useMemo(
    () =>
      selectedIssueDetail &&
      jobListResponse &&
      jobListResponse.data.filter(job => job.issueId === selectedIssueDetail.id)[0],
    [selectedIssueDetail, jobListResponse],
  );

  const handleModalOpen = () => {
    jobModal.openModal({
      name: '',
      imageFile: null,
      description: '',
    });
  };

  // 이슈 담당자 생성
  const handleAddAssignee = (newAccountId: number) => {
    if (newAccountId) {
      if (!selectedIssueDetail?.assignees.find(assignee => assignee.accountId === newAccountId)) {
        createIssueAssigneeMutation.mutate(
          {
            projectId: Number(projectId),
            accountId: newAccountId,
            issueId: Number(manualId),
          },
          {
            onSuccess: () => {
              setIsDropdownVisible(false);
            },
          },
        );
      }
    }
  };

  // 이슈 담당자 삭제
  const handleRemoveAssignee = (oldAccountId: number) => () => {
    deleteIssueAssigneeMutation.mutate({
      projectId: Number(projectId),
      accountId: oldAccountId,
      issueId: Number(manualId),
    });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // dropdown 외 다른 컴포넌트 클릭시 dropdown 안 보이게 설정
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addbBtnRef.current && !addbBtnRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addbBtnRef]);

  return (
    <L.SideBarLayout>
      <S.Wrapper>
        {screenIssueDetailSuccess && (
          <>
            <S.HeaderContainer>
              <S.Header>
                <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
                  {selectedIssueDetail?.issueName}
                </S.StyledText>

                <S.IssueAssigneeContainer>
                  <S.AssigneeBadge>
                    <S.StyledText color={PALETTE.MAIN_WHITE} fontWeight={600}>
                      담당자
                    </S.StyledText>
                  </S.AssigneeBadge>
                  <S.AssigneeContainer>
                    {selectedIssueDetail?.assignees.map(assignee => (
                      <S.AssigneeUser key={`assignee-${assignee.id}`}>
                        <S.CommitUserInfo>
                          <Comp.UserImg size="sm" path={assignee.imageUrl} />
                          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                            {assignee.name}
                          </S.StyledText>
                          <S.RoleBadgeList>
                            {assignee.roles.map(role => (
                              <Comp.RoleBadge key={`assignee-role-${role}`} role={role} selectAble={false} />
                            ))}
                          </S.RoleBadgeList>
                        </S.CommitUserInfo>
                        <S.DeleteBtn onClick={handleRemoveAssignee(assignee.accountId)}>
                          <XCircle size={14} color={PALETTE.MAIN_RED} />
                        </S.DeleteBtn>
                      </S.AssigneeUser>
                    ))}
                    <S.AddUserBtn ref={addbBtnRef}>
                      <S.Icon onClick={toggleDropdown}>
                        <Plus size={10} color={PALETTE.SUB_BLACK} />
                      </S.Icon>
                      {isDropdownVisible && (
                        <S.Dropdown>
                          {memberListResponse?.data.map(member => (
                            <S.DropdowntItem
                              key={`member-accountId-${member.account.id}`}
                              onClick={() => handleAddAssignee(member.account.id)}
                            >
                              <S.UserInfo>
                                <S.UserProfile>
                                  <Comp.UserImg size="sm" path={member.account.imageUrl} />
                                  <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                                    {member.account.nickname}
                                  </S.StyledText>
                                </S.UserProfile>
                                <S.RoleBadgeList>
                                  {member.roles.map(role => (
                                    <Comp.RoleBadge
                                      key={`assignee-role-${member.account.id}-${role}`}
                                      role={role}
                                      selectAble={false}
                                    />
                                  ))}
                                </S.RoleBadgeList>
                              </S.UserInfo>
                            </S.DropdowntItem>
                          ))}
                        </S.Dropdown>
                      )}
                    </S.AddUserBtn>
                  </S.AssigneeContainer>
                </S.IssueAssigneeContainer>
              </S.Header>
              <S.CommitWrapper>
                <S.BtnWrapper onClick={() => navigate(`/projects/${projectId}/commit-history`)}>
                  <Comp.HistoryBtn />
                </S.BtnWrapper>
                <div onClick={handleModalOpen}>
                  <Comp.Add />
                </div>
                <Comp.Modal modalId="job" title="새 작업 작성">
                  <Comp.JobCreationForm modalId="job" />
                </Comp.Modal>
              </S.CommitWrapper>
            </S.HeaderContainer>

            <S.Divider />

            <S.ContentContainer>
              {recentJob && (
                <>
                  <S.ContentItem>
                    <S.StyledText color={PALETTE.SUB_BLACK} fontSize={20}>
                      최근 작업
                    </S.StyledText>
                    <Comp.Commit
                      name={recentJob.name}
                      description={recentJob.description}
                      createdAt={recentJob.createdAt}
                      member={recentJob.member}
                      disabled={false}
                    />
                  </S.ContentItem>

                  <S.ContentItem>
                    <S.StyledText color={PALETTE.SUB_BLACK} fontSize={20}>
                      화면
                    </S.StyledText>
                    <S.CommitImageDetail>
                      <S.Img src={recentJob.imageUrl} />
                    </S.CommitImageDetail>
                  </S.ContentItem>
                </>
              )}
              {selectedIssueDetail?.connectedIssues && (
                <S.ContentItem>
                  <S.StyledText color={PALETTE.SUB_BLACK} fontSize={20}>
                    기능 명세서
                  </S.StyledText>
                  <S.ManualWrapper>
                    <Comp.ManualTable dataList={FEATURE_MANUAL_DUMMY as T.API.DetailIssue[]} usingFor="FEATURE" />
                  </S.ManualWrapper>
                </S.ContentItem>
              )}
              {/* {selectedIssueDetail?.api && (
                <S.ContentItem>
                  <S.StyledText color={PALETTE.SUB_BLACK} fontSize={20}>
                    API 명세서
                  </S.StyledText>
                  <S.ManualWrapper>
                    <Comp.ManualTable
                      columnTitles={API_MANUAL_COLUMN_TITLES}
                      dataList={API_MANUAL_DUMMY}
                      usingFor="FEATURE"
                    />
                  </S.ManualWrapper>
                </S.ContentItem>
              )} */}
            </S.ContentContainer>
          </>
        )}
      </S.Wrapper>
    </L.SideBarLayout>
  );
}

const FEATURE_MANUAL_COLUMN_TITLES: {
  name: string;
  celType: 'TEXT' | 'SELECT';
  iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
  fixedWidth: string;
}[] = [
  { name: '요구사항명', celType: 'TEXT', iconName: 'main-title-icon', fixedWidth: '200px' },
  { name: '기능명', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '200px' },
  { name: '우선순위', celType: 'SELECT', iconName: 'main-title-icon', fixedWidth: '120px' },
  { name: '사용할 화면', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '200px' },
  { name: '상세 기능', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '312px' },
  { name: '진행 상태', celType: 'SELECT', iconName: 'current-state-title', fixedWidth: '120px' },
  { name: '담당자', celType: 'SELECT', iconName: 'text-content-title', fixedWidth: '160px' },
  { name: '시작 날짜', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '160px' },
  { name: '종료 날짜', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '160px' },
];

const FEATURE_MANUAL_DUMMY = [
  {
    id: 1,
    issueName: '이슈생성테스트',
    description: '사용자 경험 추가해야 합니다.',
    type: 'FEATURE',
    epic: '사용자 개선',
    state: 'NOW',
    createdAt: '2024-05-09T10:28:34.962963',
    priority: 'HIGH',
    startedAt: '2024-05-09T16:38:09.029607',
    finishedAt: null,
    api: {
      id: 1,
      request: null,
      response: null,
      url: null,
      method: null,
    },
    assignees: [
      {
        id: 1,
        state: 'NOW',
        accountId: 4,
        name: 'test1',
        imageUrl: 'https://share-p.s3.ap-northeast-2.amazonaws.com/2024/05/09/c8810940-1e52-4dce-a2df-ff1df49de76e',
        roles: ['BACK_END', 'INFRA'],
      },
    ],
    jobs: [],
    connectedIssues: [],
  },
  {
    id: 9,
    issueName: '로그인',
    description: '서비스에 로그인 요청',
    type: 'FEATURE',
    epic: '회원',
    state: 'YET',
    createdAt: '2024-05-09T10:35:55.376246',
    priority: 'HIGH',
    startedAt: null,
    finishedAt: null,
    api: {
      id: 9,
      request: null,
      response: null,
      url: null,
      method: null,
    },
    assignees: [
      {
        id: 3,
        state: 'YET',
        accountId: 4,
        name: 'test1',
        imageUrl: 'https://share-p.s3.ap-northeast-2.amazonaws.com/2024/05/09/c8810940-1e52-4dce-a2df-ff1df49de76e',
        roles: ['BACK_END', 'INFRA'],
      },
    ],
    jobs: [],
    connectedIssues: [],
  },
];

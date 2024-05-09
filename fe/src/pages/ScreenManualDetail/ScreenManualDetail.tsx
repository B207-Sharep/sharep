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
import { AxiosResponse } from 'axios';
import { Plus, X } from 'lucide-react';

export default function ScreenManualDetail() {
  const queryClient = useQueryClient();
  const { projectId, manualId } = useParams();
  const navigate = useNavigate();
  const jobModal = useModal('job');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('left');
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

  //  TODO : 이슈 담당자 삭제
  // const { mutate: deleteIssueAssignee } = useMutation({
  //   mutationFn: ({ issueId }: { issueId: number }) =>
  //     API.project.deleteIssueAssignees({
  //       issueId: issueId,
  //       projectId: Number(projectId),
  //       accountId: Number(accountId),
  //     }),
  //   onSuccess: response => {
  //     console.log(`response :`, response);
  //   },
  // });

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
    setIsDropdownVisible(false);
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
                  {selectedIssueDetail?.assignees.map(assignee => (
                    <S.CommitUserInfo key={`assignee-${assignee.id}`}>
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
                  ))}
                  <S.AddUserBtn ref={addbBtnRef}>
                    <S.Icon onClick={toggleDropdown}>
                      <Plus size={10} color={PALETTE.SUB_BLACK} />
                    </S.Icon>
                    {isDropdownVisible && (
                      <S.Dropdown $dropdownPosition={dropdownPosition}>
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
                  <Comp.Commit
                    name={recentJob.name}
                    description={recentJob.description}
                    createdAt={recentJob.createdAt}
                    member={recentJob.member}
                    disabled={false}
                  />

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
                    <Comp.ManualTable
                      columnTitles={FEATURE_MANUAL_COLUMN_TITLES}
                      dataList={FEATURE_MANUAL_DUMMY}
                      usingFor="FEATURE"
                    />
                  </S.ManualWrapper>
                </S.ContentItem>
              )}
              {selectedIssueDetail?.api && (
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
              )}
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
    requestName: '요구사항명 - 0',
    functionName: '기능명 - 0',
    priority: 'HIGH', //
    willUsingScreen: '사용할 화면 - 0',
    detail: '상세 기능 - 0',
    state: 'DONE', // YET, NOW, DONE
    assignees: '담당자 - 0', //
    startedDate: '시작 날짜 - 0',
    endedDate: '종료 날짜 - 0',
  },
  {
    requestName: '요구사항명 - 1',
    functionName: '기능명 - 1',
    priority: 'MEDIUM', //
    willUsingScreen: '사용할 화면 - 1',
    detail: '상세 기능 - 1',
    state: 'YET', //
    assignees: '담당자 - 1', //
    startedDate: '시작 날짜 - 1',
    endedDate: '종료 날짜 - 1',
  },
  {
    requestName: '요구사항명 - 2',
    functionName: '기능명 - 2',
    priority: 'MEDIUM', //
    willUsingScreen: '사용할 화면 - 2',
    detail: '상세 기능 - 2',
    state: 'NOW', //
    assignees: '담당자 - 2', //
    startedDate: '시작 날짜 - 2',
    endedDate: '종료 날짜 - 2',
  },
  {
    requestName: '요구사항명 - 3',
    functionName: '기능명 - 3',
    priority: 'LOW', //
    willUsingScreen: '사용할 화면 - 3',
    detail: '상세 기능 - 3',
    state: 'YET', //
    assignees: '담당자 - 3', //
    startedDate: '시작 날짜 - 3',
    endedDate: '종료 날짜 - 3',
  },
];

const API_MANUAL_COLUMN_TITLES: {
  name: string;
  celType: 'TEXT' | 'SELECT';
  iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
  fixedWidth: string;
}[] = [
  { name: '분류', celType: 'TEXT', iconName: 'main-title-icon', fixedWidth: '200px' },
  { name: '진행 상태', celType: 'SELECT', iconName: 'current-state-title', fixedWidth: '120x' },
  { name: '메소드', celType: 'SELECT', iconName: 'main-title-icon', fixedWidth: '120px' },
  { name: '요청 경로', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '200px' },
  { name: '상세 설명', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '312px' },
  { name: 'Request Body', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '160px' },
  { name: 'Response Body', celType: 'TEXT', iconName: 'text-content-title', fixedWidth: '160px' },
  { name: 'BE 구현 상태', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '120px' },
  { name: 'FE 구현 상태', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '120px' },
  { name: '담당자', celType: 'SELECT', iconName: 'text-content-title', fixedWidth: '160px' },
];

const API_MANUAL_DUMMY = [
  {
    category: '요구사항명 - 0',
    state: 'DONE',
    method: 'GET',
    apiPath: 'api/member/test/1-0', //
    detail: '상세 설명 - 0',
    requestBody: 'Request Body - 0',
    responseBody: 'Response Body - 0',
    beState: '완료',
    feState: '완료',
    assignees: '담당자 - 0', //
  },
  {
    category: '요구사항명 - 1',
    state: 'YET',
    method: 'DELETE',
    apiPath: 'api/member/test/1-1', //
    detail: '상세 설명 - 1',
    requestBody: 'Request Body - 1',
    responseBody: 'Response Body - 1',
    beState: '미완료',
    feState: '미완료',
    assignees: '담당자 - 1', //
  },
  {
    category: '요구사항명 - 2',
    state: 'NOW',
    method: 'POST',
    apiPath: 'api/member/test/1-2', //
    detail: '상세 설명 - 2',
    requestBody: 'Request Body - 2',
    responseBody: 'Response Body - 2',
    beState: '완료',
    feState: '미완료',
    assignees: '담당자 - 2', //
  },
  {
    category: '요구사항명 - 3',
    state: 'DONE',
    method: 'PUT',
    apiPath: 'api/member/test/1-3', //
    detail: '상세 설명 - 3',
    requestBody: 'Request Body - 1',
    responseBody: 'Response Body - 3',
    beState: '완료',
    feState: '완료',
    assignees: '담당자 - 3', //
  },
];

package com.sharep.be.modules.issue.service;

import static org.springframework.util.Assert.isTrue;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.api.repository.ApiRepository;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.exception.MemberNotFoundException;
import com.sharep.be.modules.exception.ProjectNotFoundException;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.issue.type.DataType;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final ApiRepository apiRepository;
    private final MemberRepository memberRepository;
    private final AssigneeRepository assigneeRepository;

    @Override
    public Issue getIssue(Long id) {

        return issueRepository.findByIssueId(id, DataType.DETAIL)
                .orElseThrow(IssueNotFoundException::new);
    }

    @Override
    public List<Issue> getIssues(Long projectId, Long accountId, IssueType issueType,
            DataType dataType) {

        return issueRepository.findAllByProjectIdAndAccountIdAndIssueType(
                projectId, accountId, issueType, dataType);
    }

    @Override
    public Issue createIssue(Long projectId, Long accountId, IssueCreate issueCreate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);

        Issue issue = issueRepository.save(issueCreate.toEntityWith(project));
        apiRepository.save(Api.builder().issue(issue).build());

        IssueType type = issueCreate.type();
        if (type.equals(IssueType.PRIVATE)) {
            Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                    .orElseThrow(MemberNotFoundException::new);

            assigneeRepository.save(Assignee.builder()
                    .issue(issue)
                    .member(member)
                    .state(State.YET)
                    .build());
        }

        return issue;
    }

    @Override
    public void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate) {
        Issue issue = issueRepository.findByIssueId(id, DataType.SIMPLE)
                .orElseThrow(IssueNotFoundException::new);
        assertPrivateIssueModifyAuthorization(accountId, projectId, issue);
        issue.update(issueUpdate.issueName(), issueUpdate.description(),
                issueUpdate.epic(), issueUpdate.priority());
    }

    public void deleteIssue(Long id, Long accountId, Long projectId) {
        Issue issue = issueRepository.findById(id).orElseThrow(IssueNotFoundException::new);
        assertPrivateIssueModifyAuthorization(accountId, projectId, issue);
        issueRepository.deleteById(id);
    }

    private void assertPrivateIssueModifyAuthorization(Long accountId, Long projectId,
            Issue issue) {
        IssueType type = issue.getType();
        if (type.equals(IssueType.PRIVATE)) {
            Long memberId = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                    .orElseThrow(MemberNotFoundException::new).getId();

            Set<Assignee> assignees = issue.getAssignees();
            isTrue(assignees.size() == 1, "담당자가 한 명이 아닙니다. (데이터 오류)");

            Assignee assignee = assignees.stream().findFirst().get();
            isTrue(assignee.getMember().getId().equals(memberId), "권한이 없습니다.");
        }
    }

}

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
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
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
    public Issue getIssue(Long id) {

        return issueRepository.findById(id).orElseThrow(IssueNotFoundException::new);
    }

    @Override
    public List<Issue> getIssues(Long projectId) {

        return issueRepository.findIssuesByProjectId(projectId);
    }

    @Override
    public List<Issue> getKanbanIssues(Long projectId, Long accountId) {
        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(MemberNotFoundException::new);

        return issueRepository.findIssuesByMemberId(member.getId());
    }

    @Override
    public List<Issue> getFeatureIssues(Long projectId) {

        return issueRepository.findIssuesByProjectIdAndIssueType(projectId, IssueType.FEATURE);
    }

    @Override
    public List<Issue> getScreenIssues(Long projectId) {

        return issueRepository.findIssuesByProjectIdAndIssueType(projectId, IssueType.SCREEN);
    }

    @Override
    public void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate) {
        Issue issue = issueRepository.findById(id).orElseThrow(IssueNotFoundException::new);
        assertPrivateIssueModifyAuthorization(accountId, projectId, issue);
        issueRepository.save(issueUpdate.toEntityWith(issue));
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
            isTrue(assignees.size() == 1, "");

            Assignee assignee = assignees.stream().findFirst().get();
            isTrue(assignee.getMember().getId().equals(memberId), "");
        }
    }

}

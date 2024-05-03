package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.api.repository.ApiRepository;
import com.sharep.be.modules.assignee.Assignee;
import com.sharep.be.modules.assignee.State;
import com.sharep.be.modules.assignee.repository.AssigneeRepository;
import com.sharep.be.modules.exception.AssigneeNotFoundException;
import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.exception.MemberNotFoundException;
import com.sharep.be.modules.exception.ProjectNotFoundException;
import com.sharep.be.modules.exception.UnauthorizedException;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse.PrivateIssueResponse;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
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
    public IssueCreated createIssue(Long projectId, Long accountId, IssueCreate issueCreate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);

        Issue issue = issueRepository.save(Issue.from(issueCreate, project));
        apiRepository.save(Api.builder().issue(issue).build());

        IssueType type = issueCreate.type();
        if (type.equals(IssueType.PRIVATE)) {
            Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                    .orElseThrow(MemberNotFoundException::new);

            assigneeRepository.save(
                    Assignee.builder().issue(issue).member(member).state(State.YET).build());

        }

        return issue.toCreated();
    }


    @Override
    public List<IssueResponse> getIssues(Long projectId) {
        return issueRepository.findIssuesByProjectId(projectId).orElse(Collections.emptyList())
                .stream().map(Issue::toResponse).toList();
    }

    @Override
    public IssueResponse getIssue(Long id) {
        return issueRepository.findById(id).orElseThrow(IssueNotFoundException::new).toResponse();
    }

    @Override
    public List<PrivateIssueResponse> getPrivateIssues(Long projectId, Long accountId) {
        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(MemberNotFoundException::new);

        return issueRepository.findIssuesByMemberIdAndIssueType(member.getId(), IssueType.PRIVATE)
                .stream().map(Issue::toPrivateIssueResponse).toList();
    }

    @Override
    public void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate) {
        Issue issue = issueRepository.findById(id).orElseThrow(IssueNotFoundException::new);
        IssueType type = issue.getType();
        if (type.equals(IssueType.PRIVATE)) {
            Long memberId = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                    .orElseThrow(MemberNotFoundException::new).getId();

            Assignee assignee = issue.getAssignees().stream().findFirst()
                    .orElseThrow(AssigneeNotFoundException::new);

            if (!assignee.getMember().getId().equals(memberId)) {
                throw new UnauthorizedException();
            }
        }

        issueRepository.save(issue.from(issueUpdate));
    }

    @Override
    public void deleteIssue(Long id) {
        // TODO: 권한 설정
        issueRepository.deleteById(id);
    }

}

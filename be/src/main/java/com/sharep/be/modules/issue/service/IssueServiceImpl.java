package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.api.repository.ApiRepository;
import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.exception.ProjectNotFoundException;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import com.sharep.be.modules.issue.repository.IssueRepository;
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

    @Override
    public IssueCreated createIssue(Long projectId, IssueCreate issueCreate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);

        Issue issue = issueRepository.save(Issue.from(issueCreate, project));
        apiRepository.save(Api.builder().issue(issue).build());

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
    public List<IssueResponse> getPrivateIssues(Long projectId, Long accountId) {
        // TODO: 상훈: 내 이슈 조회
        return null;
    }

    @Override
    public IssueResponse updateIssue(IssueUpdate issueCreate) {
        // TODO: 상훈: 수정 권한 체크
        return null;
    }

    @Override
    public IssueResponse deleteIssue(Long id) {
        return null;
    }

}

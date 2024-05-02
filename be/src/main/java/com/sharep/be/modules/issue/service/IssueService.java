package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import java.util.List;

public interface IssueService {

    IssueCreated createIssue(Long projectId, IssueCreate issueCreate);

    List<IssueResponse> getIssues(Long projectId);

    IssueResponse getIssue(Long id);

    IssueResponse updateIssue(IssueUpdate issueCreate);

    IssueResponse deleteIssue(Long id);

    List<IssueResponse> getPrivateIssues(Long projectId, Long accountId);
}

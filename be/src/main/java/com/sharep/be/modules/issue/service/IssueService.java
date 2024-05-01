package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.issue.IssueCreate;
import com.sharep.be.modules.issue.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueUpdate;
import java.util.List;

public interface IssueService {

    IssueCreated createIssue(Long projectId, IssueCreate issueCreate);

    List<IssueResponse> getIssues(Long projectId);

    IssueResponse getIssue(Long id);

    IssueResponse updateIssue(IssueUpdate issueCreate);

    IssueResponse deleteIssue(Long id);

    List<IssueResponse> getPrivateIssues(Long projectId, Long accountId);
}

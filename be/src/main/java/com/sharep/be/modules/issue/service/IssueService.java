package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse.PrivateIssueResponse;
import java.util.List;

public interface IssueService {

    IssueCreated createIssue(Long projectId, Long accountId, IssueCreate issueCreate);

    List<IssueResponse> getIssues(Long projectId);

    IssueResponse getIssue(Long id);

    void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate);

    void deleteIssue(Long id);

    List<PrivateIssueResponse> getPrivateIssues(Long projectId, Long accountId);
}

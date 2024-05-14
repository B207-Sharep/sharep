package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.type.DataType;
import com.sharep.be.modules.issue.type.IssueType;
import java.util.List;

public interface IssueService {

    Issue createIssue(Long projectId, Long accountId, IssueCreate issueCreate);

    Issue getIssue(Long id);

    List<Issue> getIssues(Long projectId, Long accountId, IssueType issueType, DataType dataType);

    void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate);

    void updateIssue(Long issueId, IssueUpdate issueUpdate);

    void deleteIssue(Long id, Long accountId, Long projectId);
}

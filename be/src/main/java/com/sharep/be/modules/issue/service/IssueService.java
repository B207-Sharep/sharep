package com.sharep.be.modules.issue.service;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import java.util.List;

public interface IssueService {

    Issue createIssue(Long projectId, Long accountId, IssueCreate issueCreate);

    Issue getIssue(Long id);

    List<Issue> getIssues(Long projectId);

    void updateIssue(Long id, Long accountId, Long projectId, IssueUpdate issueUpdate);

    void deleteIssue(Long id, Long accountId, Long projectId);

    List<Issue> getKanbanIssues(Long projectId, Long accountId);

    List<Issue> getFeatureIssues(Long projectId);

    List<Issue> getScreenIssues(Long projectId);
}

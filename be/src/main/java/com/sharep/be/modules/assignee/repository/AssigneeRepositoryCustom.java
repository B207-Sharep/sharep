package com.sharep.be.modules.assignee.repository;

import com.sharep.be.modules.assignee.domain.Assignee;
import java.util.List;
import java.util.Optional;

public interface AssigneeRepositoryCustom {

    List<Assignee> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    List<Assignee> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Assignee> findAccountIdsByIssueId(Long issueId);

    List<Assignee> findAllByProjectIdAndIssueIdAndAccountIdsIn(Long projectId, Long issueId, Long[] accountIds);
}

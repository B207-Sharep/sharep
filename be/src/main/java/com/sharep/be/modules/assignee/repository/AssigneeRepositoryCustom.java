package com.sharep.be.modules.assignee.repository;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.repository.projection.AccountAndIssueProjection;
import java.util.List;
import java.util.Optional;

public interface AssigneeRepositoryCustom {

    List<AccountAndIssueProjection> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    List<AccountAndIssueProjection> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Assignee> findAccountIdsByIssueId(Long issueId);
}

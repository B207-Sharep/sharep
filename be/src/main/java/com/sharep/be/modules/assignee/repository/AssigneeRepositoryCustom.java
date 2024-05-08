package com.sharep.be.modules.assignee.repository;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.repository.projection.MemberAndIssueProjection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AssigneeRepositoryCustom {

    Set<MemberAndIssueProjection> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    Set<MemberAndIssueProjection> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Assignee> findAccountIdsByIssueId(Long issueId);
}

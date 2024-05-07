package com.sharep.be.modules.assignee.repository;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.repository.projection.MemberAndIssueProjection;
import java.util.List;
import java.util.Optional;

public interface AssigneeRepositoryCustom {

    List<MemberAndIssueProjection> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    List<MemberAndIssueProjection> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Assignee> findAccountIdsByIssueId(Long issueId);
}

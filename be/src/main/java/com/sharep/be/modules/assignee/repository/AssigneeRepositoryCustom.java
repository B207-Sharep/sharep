package com.sharep.be.modules.assignee.repository;

import com.querydsl.core.Tuple;
import com.sharep.be.modules.assignee.domain.Assignee;
import java.util.List;
import java.util.Optional;

public interface AssigneeRepositoryCustom {

    List<Tuple> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    List<Tuple> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Tuple> findAccountIdsByIssueId(Long issueId);
}

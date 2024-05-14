package com.sharep.be.modules.assignee.service;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssigneeRepository {

    Optional<Assignee> findByMemberIdAndIssueId(Long memberId, Long issueId);

    boolean existsByMemberIdAndIssueId(Long id, Long id1);

    boolean existsByMemberIdAndState(Long id, State state);

    Assignee findByMemberProjectIdAndIssueIdAndMemberAccountId(Long projectId, Long issueId, Long accountId);

    List<Assignee> findAllProjectNowIssueByProjectId(Long projectsId);

    Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId);

    List<Assignee> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Assignee> findAccountIdsByIssueId(Long issueId);

    List<Assignee> findAllByProjectIdAndIssueIdAndAccountIdsIn(Long projectId, Long issueId, Long[] accountIds);

    void save(Assignee assignee);

    void delete(Assignee assignee);
}

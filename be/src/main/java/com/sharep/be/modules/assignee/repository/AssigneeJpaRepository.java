package com.sharep.be.modules.assignee.repository;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssigneeJpaRepository extends JpaRepository<Assignee, Long> {


    Optional<Assignee> findByMemberIdAndIssueId(Long memberId, Long issueId);

    boolean existsByMemberIdAndIssueId(Long memberId, Long issueId);

    boolean existsByMemberIdAndState(Long memberId, State state);

    Optional<Assignee> findByMemberProjectIdAndIssueIdAndMemberAccountId(Long projectId, Long issueId, Long accountId);
}

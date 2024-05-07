package com.sharep.be.modules.assignee.service;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.repository.AssigneeRepositoryCustom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AssigneeRepository extends JpaRepository<Assignee, Long>,
        AssigneeRepositoryCustom {

    Optional<Assignee> findByMemberIdAndIssueId(Long memberId, Long issueId);

    boolean existsByMemberIdAndIssueId(Long id, Long id1);


}

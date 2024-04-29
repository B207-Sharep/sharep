package com.sharep.be.modules.assignee;

import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssigneeRepository extends JpaRepository<Assignee, Long> {

    Optional<Assignee> findByMemberIdAndIssueId(Long memberId, Long issueId);

    boolean deleteByMemberIdAndIssueId(Long memberId, Long issueId);
}

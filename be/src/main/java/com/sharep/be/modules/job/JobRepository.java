package com.sharep.be.modules.job;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JobRepositoryCustom {

    List<Job> findAllByIssueId(Long issueId);

}

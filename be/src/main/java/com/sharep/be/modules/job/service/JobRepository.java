package com.sharep.be.modules.job.service;


import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import java.util.Optional;

public interface JobRepository {

    Optional<Job> findByCommitId(String commitId);

    List<Job> findAllByAccountId(Long accountId);

    List<Job> findContributionByProjectIdAndAccountId(Long projectId, Long accountId);

    List<Job> findAllByCondition(Long projectId, Long accountId, Long issueId, RoleType roleType);

    void save(Job job);
}

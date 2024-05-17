package com.sharep.be.modules.job.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.domain.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.job.service.JobRepository;
import com.sharep.be.modules.member.Role.RoleType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JobRepositoryImpl implements JobRepository {

    private final JPAQueryFactory queryFactory;
    private final JobJpaRepository jobJpaRepository;


    @Override
    public Optional<Job> findByCommitId(String commitId) {
        return jobJpaRepository.findByCommitId(commitId);
    }

    @Override
    public List<Job> findAllByAccountId(Long accountId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneYearAgo = now.minusYears(1);

        return queryFactory.selectFrom(job).innerJoin(job.member, member)
                .innerJoin(member.account, account)
                // 1년 체크
                .where(job.createdAt.between(oneYearAgo, now)).where(account.id.eq(accountId))
                .orderBy(job.createdAt.desc()).fetch();
    }

    @Override
    public List<Job> findContributionByProjectIdAndAccountId(Long projectId, Long accountId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member)
                .innerJoin(member.project, project)
                .innerJoin(member.account, account)
                .where(project.id.eq(projectId))
                .where(account.id.eq(accountId))
                .fetch();
    }

    @Override
    public List<Job> findAllByCondition(Long projectId, Long accountId, Long issueId,
            RoleType roleType) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member).fetchJoin()
                .innerJoin(member.roles, role1).fetchJoin()
                .innerJoin(member.account, account)
                .fetchJoin().innerJoin(member.project, project).fetchJoin()
                .innerJoin(job.issue, issue).fetchJoin()
                .leftJoin(issue.api, api).fetchJoin()
                .where(eqProjectId(projectId)).where(eqAccountId(accountId))
                .where(eqIssueId(issueId)).where(eqRoleType(roleType)).orderBy(job.createdAt.desc())
                .fetch();
    }

    @Override
    public void save(Job job) {
        jobJpaRepository.save(job);
    }

    private BooleanExpression eqRoleType(RoleType roleType) {
        return roleType == null ? null : role1.role.eq(roleType);
    }

    private BooleanExpression eqIssueId(Long issueId) {
        return issueId == null ? null : issue.id.eq(issueId);
    }

    private BooleanExpression eqAccountId(Long accountId) {
        return accountId == null ? null : account.id.eq(accountId);
    }

    private BooleanExpression eqProjectId(Long projectId) {
        return projectId == null ? null : project.id.eq(projectId);
    }

}

package com.sharep.be.modules.job.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.domain.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.member.Role.RoleType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JobRepositoryCustomImpl implements JobRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Job> findAllByProjectId(Long projectId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member)
                .innerJoin(member.project, project)
                .where(project.id.eq(projectId))
                .orderBy(job.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Job> findAllByAccountIdAndProjectId(Long accountId, Long projectId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member)
                .innerJoin(member.account, account)
                .innerJoin(member.project, project)
                .where(account.id.eq(accountId))
                .where(project.id.eq(projectId))
                .orderBy(job.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Job> findAllByProjectIdAndRoleType(Long projectId, RoleType roleType) {

        return queryFactory.selectFrom(job)
                .innerJoin(job.member, member)
                .innerJoin(member.roles, role1)
                .innerJoin(member.project, project)
                .where(project.id.eq(projectId))
                .where(role1.role.eq(roleType))
                .orderBy(job.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Job> findAllByProjectIdAndIssueId(Long projectId, Long issueId) {
        return queryFactory.selectFrom(job)
                .innerJoin(job.issue, issue)
                .innerJoin(job.member, member)
                .innerJoin(member.project, project)
                .where(project.id.eq(projectId))
                .where(issue.id.eq(issueId))
                .orderBy(job.createdAt.desc())
                .fetch();

    }

    @Override
    public List<Job> findAllByAccountId(Long accountId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneYearAgo = now.minusYears(1);


        return queryFactory.selectFrom(job)
                .innerJoin(job.member, member)
                .innerJoin(member.account, account)
                // 1년 체크
                .where(job.createdAt.between(oneYearAgo, now))
                .where(account.id.eq(accountId))
                .orderBy(job.createdAt.desc())
                .fetch();
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

}

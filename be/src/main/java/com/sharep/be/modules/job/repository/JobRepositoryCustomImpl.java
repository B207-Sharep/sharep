package com.sharep.be.modules.job.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.job.Job;
import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JobRepositoryCustomImpl implements JobRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final IssueRepository issueRepository;

    @Override
    public List<Job> findAllByProjectId(Long projectId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member)
                .innerJoin(member.project, project)
                .where(project.id.eq(projectId))
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
                .fetch();

    }

}

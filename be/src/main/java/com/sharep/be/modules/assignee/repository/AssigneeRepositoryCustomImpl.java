package com.sharep.be.modules.assignee.repository;

import static com.sharep.be.modules.account.QAccount.account;

import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;

import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.assignee.repository.projection.AccountAndIssueProjection;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class AssigneeRepositoryCustomImpl implements AssigneeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<AccountAndIssueProjection> findAllProjectNowIssueByProjectId(Long projectId) {

        return queryFactory.select(
                        Projections.constructor(
                                AccountAndIssueProjection.class,
                                account,
                                issue
                        )
                )
                .from(assignee)
                .innerJoin(assignee.issue, issue)
                .rightJoin(assignee.member, member)
                .on(assignee.state.eq(State.NOW))
                .leftJoin(member.account, account)
                .leftJoin(member.project, project)
                .where(project.id.eq(projectId))
                .orderBy(assignee.startedAt.desc())
                .fetch();
    }

    @Override
    public List<AccountAndIssueProjection> findAllProjectNowIssueByProjectIdAndAccountId(Long projectId,
            Long accountId) {
        return queryFactory.select(
                        Projections.constructor(
                                AccountAndIssueProjection.class,
                                account,
                                issue
                        )
                )
                .from(assignee)
                .innerJoin(assignee.issue, issue)
                .rightJoin(assignee.member, member)
                .on(assignee.state.eq(State.NOW))
                .leftJoin(member.account, account)
                .leftJoin(member.project, project)
                .where(project.id.eq(projectId))
                .where(account.id.eq(accountId))
                .orderBy(assignee.startedAt.desc())
                .fetch();
    }

    @Override
    public Optional<Assignee> findByAccountIdAndProjectId(Long accountId, Long projectId) {
        return Optional.of(queryFactory.select(assignee)
                .from(assignee)
                .join(assignee.member, member)
                .join(assignee.issue, issue)
                .where(member.account.id.eq(accountId)
                        .and(member.project.id.eq(projectId))
                        .and(assignee.state.eq(State.NOW)))
                .fetchFirst());
    }


    public List<Assignee> findAccountIdsByIssueId(Long issueId) {
        return queryFactory.select(assignee).distinct()
                .from(assignee)
                .innerJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .innerJoin(assignee.issue, issue).fetchJoin()
                .leftJoin(issue.api, api).fetchJoin()
                .leftJoin(member.roles, role1).fetchJoin()
                .where(issue.id.eq(issueId))
                .fetch();
    }
}

package com.sharep.be.modules.assignee.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class AssigneeRepositoryCustomImpl implements AssigneeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Assignee> findAllProjectNowIssueByProjectId(Long projectId) {

        return findAllProjectNowIssueByProjectIdAndAccountId(projectId, null);
    }

//    @Override
//    public Set<MemberAndIssueProjection> findAllProjectNowIssueByProjectIdAndAccountId(
//            Long projectId,
//            Long accountId) {
//
//        return new HashSet<>(queryFactory.select(
//                        Projections.constructor(
//                                MemberAndIssueProjection.class,
//                                member,
//                                assignee,
//                                issue
//                        )
//                )
//                .from(assignee)
//                .innerJoin(assignee.issue, issue).fetchJoin()
//                .innerJoin(issue.api, api).fetchJoin()
//                .rightJoin(assignee.member, member)
//                .on(assignee.state.eq(State.NOW))
//                .leftJoin(member.account, account).fetchJoin()
//                .leftJoin(member.project, project).fetchJoin()
//                .leftJoin(member.roles, role1).fetchJoin()
//                .where(project.id.eq(projectId))
//                .where(eqAccountId(accountId))
//                .orderBy(assignee.startedAt.desc())
//                .fetch());

    //    }


    @Override
    public List<Assignee> findAllProjectNowIssueByProjectIdAndAccountId(
            Long projectId, Long accountId) {
        return queryFactory.select(assignee)
                .from(assignee)
                .innerJoin(assignee.member, member)
                .innerJoin(member.account, account)
                .innerJoin(member.project, project)
                .where(eqAccountId(accountId))
                .where(project.id.eq(projectId))
                .where(assignee.state.eq(State.NOW))
                .orderBy(assignee.startedAt.asc())
                .fetch();
    }

    private BooleanExpression eqAccountId(Long accountId) {
        return accountId == null ? null : account.id.eq(accountId);
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
        return queryFactory.select(assignee)
                .from(assignee)
                .innerJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .innerJoin(assignee.issue, issue).fetchJoin()
                .leftJoin(issue.api, api).fetchJoin()
                .leftJoin(member.roles, role1).fetchJoin()
                .where(issue.id.eq(issueId))
                .fetch();
    }

    @Override
    public List<Assignee> findAllByProjectIdAndIssueIdAndAccountIdsIn(Long projectId, Long issueId,
            Long[] accountIds) {
        return queryFactory.select(assignee)
                .from(assignee)
                .innerJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.roles, role1).fetchJoin()
                .innerJoin(member.project, project).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .innerJoin(assignee.issue, issue).fetchJoin()
                .innerJoin(issue.api, api).fetchJoin()
                .where(project.id.eq(projectId))
                .where(issue.id.eq(issueId))
                .where(account.id.in(accountIds))
                .fetch();
    }
}

package com.sharep.be.modules.assignee.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.assignee.QAssignee.*;
import static com.sharep.be.modules.assignee.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.assignee.Assignee;
import com.sharep.be.modules.assignee.QAssignee;
import com.sharep.be.modules.assignee.State;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

@Repository
@RequiredArgsConstructor
public class AssigneeRepositoryCustomImpl implements AssigneeRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Tuple> findAllProjectNowIssueByProjectId(Long projectId) {

        return queryFactory.select(issue, assignee, account)
                .from(assignee)
                .leftJoin(assignee.issue, issue)
                .innerJoin(assignee.member, member)
                .innerJoin(member.account, account)
                .innerJoin(issue.project, project)
                .where(project.id.eq(projectId))
                .fetch();
    }

    @Override
    public List<Tuple> findAllProjectNowIssueByProjectIdAndAccountID(Long projectId,
            Long accountId) {
        return queryFactory.select(issue, assignee, account)
                .from(assignee)
                .leftJoin(assignee.issue, issue)
                .innerJoin(assignee.member, member)
                .innerJoin(member.account, account)
                .innerJoin(issue.project, project)
                .where(project.id.eq(projectId))
                .where(account.id.eq(accountId))
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
}

package com.sharep.be.modules.assignee.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
}

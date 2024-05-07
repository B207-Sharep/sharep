package com.sharep.be.modules.notification.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;
import static com.sharep.be.modules.notification.domain.QNotification.notification;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.notification.domain.Notification;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryCustomImpl implements NotificationRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Notification> findAllByProjectIdAndAccountId(Long projectId, Long accountId) {
        return queryFactory.select(notification)
                .from(notification)
                .innerJoin(notification.assignee, assignee).fetchJoin()
                .innerJoin(notification.member, member).fetchJoin()
                .innerJoin(member.project, project).fetchJoin()
                .innerJoin(member.roles, role1).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .innerJoin(assignee.issue, issue).fetchJoin()
                .innerJoin(issue.api, api).fetchJoin()
                .where(project.id.eq(projectId))
                .where(account.id.eq(accountId))
                .fetch();
    }
}

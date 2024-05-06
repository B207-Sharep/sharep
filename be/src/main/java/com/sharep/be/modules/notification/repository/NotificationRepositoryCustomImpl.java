package com.sharep.be.modules.notification.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.notification.domain.QNotification.notification;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryCustomImpl implements NotificationRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Tuple> findALlByProjectIdAndAccountId(Long projectId, Long accountId) {
        return queryFactory.select(account, member, assignee, issue)
                .from(notification)
                .innerJoin(notification.assignee, assignee)
                .innerJoin(notification.member, member)
                .innerJoin(member.account, account)
                .innerJoin(assignee.issue, issue)
                .fetch();
    }
}

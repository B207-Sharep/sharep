package com.sharep.be.modules.issue.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.QJob.job;
import static com.sharep.be.modules.member.QMember.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.type.IssueType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomIssueRepositoryImpl implements CustomIssueRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Issue> findIssuesByMemberIdAndIssueType(Long memberId, IssueType issueType) {
        return queryFactory.select(issue).from(issue).leftJoin(issue.api, api).fetchJoin()
                .leftJoin(issue.jobs, job).fetchJoin().innerJoin(issue.assignees, assignee)
                .fetchJoin().innerJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.account, account).where(issue.type.eq(issueType))
                .where(member.id.eq(memberId)).fetch();
    }
}


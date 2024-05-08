package com.sharep.be.modules.issue.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.domain.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.QIssue;
import com.sharep.be.modules.issue.type.DataType;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.storyboard.QStoryboard;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomIssueRepositoryImpl implements CustomIssueRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Issue> findAllByProjectIdAndAccountIdAndIssueType(
            Long projectId, Long accountId, IssueType issueType, DataType dataType) {

        QStoryboard featureStoryboard = new QStoryboard("featureStoryboard");
        QStoryboard screenStoryboard = new QStoryboard("screenStoryboard");
        QIssue screenIssue = new QIssue("screenIssue");
        QIssue featureIssue = new QIssue("featureIssue");

        BooleanBuilder condition = new BooleanBuilder();
        condition.and(project.id.eq(projectId));

        if (issueType != null) {
            condition.and(issue.type.eq(issueType));
        }

        if (accountId != null) {
            condition.and(issue.assignees.any().member.account.id.eq(accountId));
        }

        JPAQuery<Issue> simpleIssueJPAQuery = queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.api, api).fetchJoin()
                .leftJoin(issue.jobs, job).fetchJoin()
                .leftJoin(issue.assignees, assignee).fetchJoin()
                .leftJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .innerJoin(member.roles).fetchJoin()
                .innerJoin(issue.project, project)
                .where(condition);

        return DataType.SIMPLE.equals(dataType) ?
                simpleIssueJPAQuery.fetch() : simpleIssueJPAQuery
                .leftJoin(issue.featureStoryboards, featureStoryboard).fetchJoin()
                .leftJoin(issue.screenStoryboards, screenStoryboard).fetchJoin()
                .leftJoin(featureStoryboard.screenIssue, screenIssue).fetchJoin()
                .leftJoin(screenStoryboard.featureIssue, featureIssue).fetchJoin()
                .leftJoin(screenIssue.api).fetchJoin()
                .leftJoin(featureIssue.api).fetchJoin()
                .leftJoin(screenIssue.assignees).fetchJoin()
                .leftJoin(featureIssue.assignees).fetchJoin()
                .leftJoin(screenIssue.jobs).fetchJoin()
                .leftJoin(featureIssue.jobs).fetchJoin()
                .fetch();
    }
}


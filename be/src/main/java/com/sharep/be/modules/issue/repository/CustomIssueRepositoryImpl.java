package com.sharep.be.modules.issue.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;
import static com.sharep.be.modules.storyboard.QStoryboard.storyboard;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.QIssue;
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
        return queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.api, api).fetchJoin()
                .innerJoin(issue.assignees, assignee).fetchJoin()
                .innerJoin(assignee.member, member)
                .innerJoin(member.account, account)
                .leftJoin(issue.jobs, job).fetchJoin()
                .where(issue.type.eq(issueType).and(member.id.eq(memberId)))
                .fetch();
    }

    @Override
    public List<Issue> findIssuesByProjectIdAndIssueType(Long projectId,
            IssueType issueType) {
        return queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.assignees, assignee).fetchJoin()
                .leftJoin(assignee.member, member)
                .leftJoin(member.account, account)
                .innerJoin(issue.project, project)
                .leftJoin(issue.storyboards, storyboard).fetchJoin()
                .leftJoin(storyboard.screenIssue, new QIssue("screenIssue")).fetchJoin()
                .leftJoin(issue.api, api).fetchJoin()
                .where(issue.type.eq(issueType).and(project.id.eq(projectId)))
                .fetch();
    }
}


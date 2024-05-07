package com.sharep.be.modules.issue.repository;

import static com.sharep.be.modules.account.QAccount.account;
import static com.sharep.be.modules.api.QApi.api;
import static com.sharep.be.modules.assignee.domain.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.job.domain.QJob.job;
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
    public List<Issue> findAllByMemberId(Long memberId) {
        return queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.api, api).fetchJoin()
                .innerJoin(issue.assignees, assignee).fetchJoin()
                .innerJoin(assignee.member, member).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .leftJoin(issue.jobs, job).fetchJoin()
                .where(issue.assignees.any().member.id.eq(memberId))
                .fetch();
    }

    @Override
    public List<Issue> findAllByProjectIdAndIssueType(Long projectId,
            IssueType issueType) {
        return queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.assignees, assignee).fetchJoin()
                .leftJoin(assignee.member, member).fetchJoin()
                .leftJoin(member.account, account).fetchJoin()
                .innerJoin(issue.project, project)
                .leftJoin(issue.storyboards, storyboard).fetchJoin()
                .leftJoin(storyboard.screenIssue, new QIssue("screenIssue")).fetchJoin()
                .leftJoin(issue.api, api).fetchJoin()
                .where(issue.type.eq(issueType).and(project.id.eq(projectId)))
                .fetch();
    }

    @Override
    public List<Issue> findAllByProjectId(Long projectId) {
        return queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.api, api).fetchJoin()
                .innerJoin(issue.project, project)
                .where(project.id.eq(projectId))
                .fetch();
    }

}


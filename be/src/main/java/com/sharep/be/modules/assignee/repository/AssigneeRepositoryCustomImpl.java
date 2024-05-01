package com.sharep.be.modules.assignee.repository;

import static com.sharep.be.modules.assignee.QAssignee.assignee;
import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.assignee.State;
import com.sharep.be.modules.issue.Issue;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AssigneeRepositoryCustomImpl implements AssigneeRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Issue> findAllProjectNowIssueByProjectId(Long projectId) {

        return queryFactory.select(issue)
                .from(assignee)
                .innerJoin(assignee.issue)
                .innerJoin(assignee.member, member)
                .innerJoin(member.project)
                .where(assignee.state.eq(State.NOW))
                .fetch();
    }
}

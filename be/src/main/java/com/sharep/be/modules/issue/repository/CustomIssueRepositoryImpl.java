package com.sharep.be.modules.issue.repository;

import static com.sharep.be.modules.issue.QIssue.issue;
import static com.sharep.be.modules.storyboard.QStoryboard.storyboard;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.QIssue;
import com.sharep.be.modules.issue.dto.FeatureDto;
import com.sharep.be.modules.issue.type.IssueType;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomIssueRepositoryImpl implements CustomIssueRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<List<FeatureDto>> findFeatureIssuesByProjectIdAndIssueType(Long projectId,
            IssueType issueType) {

        List<Issue> issues = queryFactory
                .select(issue)
                .from(issue)
                .leftJoin(issue.storyboards, storyboard).fetchJoin()
                .leftJoin(storyboard.screenIssue, new QIssue("screenIssue")).fetchJoin()
                .leftJoin(issue.assignees).fetchJoin()
                .where(issue.type.eq(IssueType.FEATURE)
                        .and(issue.project.id.eq(projectId)))
                .fetch();

        List<FeatureDto> features = null;

//        List<FeatureDto> features = queryFactory.select(
//                        Projections.fields(FeatureDto.class, issue.id, issue.epic, issue.issueName,
//                                issue.priority)).from(issue)
//                .where(issue.type.eq(IssueType.FEATURE).and(issue.projectId.eq(projectId))).fetch();
//
//        features.forEach(featureDto -> {
//            List<ScreenResponseDto> screenIssues = queryFactory.select(
//                            Projections.constructor(ScreenResponseDto.class, storyboard.screenIssue.id,
//                                    storyboard.screenIssue.issueName)).from(storyboard)
//                    .leftJoin(storyboard.screenIssue)
//                    .where(storyboard.feature_issue_id.eq(featureDto.getId())).fetch();
//
//            featureDto.setScreenIssues(screenIssues);
//
//            List<AssignedMemberResponseDto> assignees = queryFactory.select(
//                            Projections.constructor(AssignedMemberResponseDto.class, assignee.member.id,
//                                    assignee.state, assignee.startedAt, assignee.finishedAt)).from(assignee)
//                    .where(assignee.issue.id.eq(featureDto.getId())).fetch();
//
//            featureDto.setAssignees(assignees);
//
//            LocalDateTime startedTime = assignees.stream()
//                    .map(AssignedMemberResponseDto::getStartedAt)
//                    .min(LocalDateTime::compareTo)
//                    .orElse(null);
//
//            LocalDateTime finishedTime = assignees.stream()
//                    .map(AssignedMemberResponseDto::getFinishedAt)
//                    .max(LocalDateTime::compareTo)
//                    .orElse(null);
//
//            featureDto.setStartedTime(startedTime);
//            featureDto.setFinishedTime(finishedTime);
//        });

        return Optional.of(features);
    }
}


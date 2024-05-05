package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.ApiResponse;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.AssigneeResponse;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.job.JobResponse;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import lombok.Builder;

@Builder
public record IssueResponse(Long id, String issueName, String description, IssueType type,
                            String epic, State state, LocalDateTime createdAt,
                            PriorityType priority, ApiResponse api,
                            List<AssigneeResponse> assignees, List<JobResponse> jobs) {


    public static IssueResponse from(Issue issue) {
        return IssueResponse.builder()
                .id(issue.getId())
                .issueName(issue.getIssueName())
                .description(issue.getDescription())
                .type(issue.getType())
                .epic(issue.getEpic())
                .createdAt(issue.getCreatedAt())
                .priority(issue.getPriority())
                .state(issue.calculateState())
                .api(ApiResponse.from(issue.getApi()))
                .assignees(issue.getAssignees().stream().map(AssigneeResponse::from).toList())
                .jobs(issue.getJobs().stream().map(JobResponse::from).toList())
                .build();
    }

    @Builder
    public record IssueCreated(Long id) {

        public static IssueCreated from(Issue issue) {
            return IssueCreated.builder()
                    .id(issue.getId())
                    .build();
        }
    }

    @Builder
    public record PrivateIssueResponse(Long id, String issueName, String description,
                                       IssueType type, String epic, State state,
                                       LocalDateTime createdAt, PriorityType priority,
                                       List<AssigneeResponse> assignees, List<JobResponse> jobs) {

        public static PrivateIssueResponse from(Issue issue) {
            return PrivateIssueResponse.builder()
                    .id(issue.getId())
                    .issueName(issue.getIssueName())
                    .description(issue.getDescription())
                    .type(issue.getType())
                    .epic(issue.getEpic())
                    .createdAt(issue.getCreatedAt())
                    .priority(issue.getPriority())
                    .state(issue.calculateState())
                    .assignees(issue.getAssignees().stream().map(AssigneeResponse::from).toList())
                    .jobs(issue.getJobs().stream().map(JobResponse::from).toList())
                    .build();
        }

    }

    @Builder
    public record FeatureIssueResponse(Long id, String issueName, String description,
                                       IssueType type, String epic, State state,
                                       LocalDateTime createdAt, PriorityType priority,
                                       List<AssigneeResponse> assignees,
                                       List<ScreenIssueResponse> screens, LocalDateTime startedAt,
                                       LocalDateTime finishedAt) {

        public static FeatureIssueResponse from(Issue issue) {
            return FeatureIssueResponse.builder()
                    .id(issue.getId())
                    .issueName(issue.getIssueName())
                    .description(issue.getDescription())
                    .type(issue.getType())
                    .epic(issue.getEpic())
                    .state(issue.calculateState())
                    .createdAt(issue.getCreatedAt())
                    .priority(issue.getPriority())
                    .assignees(issue.getAssignees().stream().map(AssigneeResponse::from).toList())
                    .screens(issue.getStoryboards().stream()
                            .map(storyboard -> ScreenIssueResponse.from(
                                    storyboard.getScreenIssue()))
                            .toList())
                    .startedAt(issue.getAssignees().stream()
                            .min(Comparator.comparing(Assignee::getStartedAt))
                            .map(Assignee::getStartedAt).orElse(null))
                    .finishedAt(issue.getAssignees().stream()
                            .max(Comparator.comparing(Assignee::getStartedAt))
                            .map(Assignee::getStartedAt).orElse(null))
                    .build();
        }
    }

    @Builder
    public record ScreenIssueResponse(Long id, String issueName, String description) {

        public static ScreenIssueResponse from(Issue issue) {
            return ScreenIssueResponse.builder()
                    .id(issue.getId())
                    .issueName(issue.getIssueName())
                    .description(issue.getDescription())
                    .build();
        }
    }

    @Builder
    public record SimpleIssueResponse(Long id, String issueName, String description) {

        public static SimpleIssueResponse from(Issue issue) {
            return SimpleIssueResponse.builder()
                    .id(issue.getId())
                    .issueName(issue.getIssueName())
                    .description(issue.getDescription())
                    .build();
        }
    }
}

package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.ApiResponse;
import com.sharep.be.modules.assignee.controller.response.AssigneeResponse;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.job.controller.response.JobResponse;
import com.sharep.be.modules.storyboard.Storyboard;
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
    public record KanbanIssueResponse(Long id, String issueName, String description,
                                      IssueType type, String epic, State state,
                                      LocalDateTime createdAt, PriorityType priority,
                                      List<AssigneeResponse> assignees, List<JobResponse> jobs) {

        public static KanbanIssueResponse from(Issue issue) {
            return KanbanIssueResponse.builder()
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
                                       List<ConnectedScreenIssueResponse> screens,
                                       LocalDateTime startedAt,
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
                    .screens(issue.getFeatureStoryboards().stream()
                            .map(ConnectedScreenIssueResponse::from).toList())
                    .startedAt(issue.getAssignees().stream()
                            .filter(assignee -> assignee.getStartedAt() != null)
                            .min(Comparator.comparing(Assignee::getStartedAt))
                            .map(Assignee::getStartedAt).orElse(null))
                    .finishedAt(issue.getAssignees().stream()
                            .filter(assignee -> assignee.getFinishedAt() != null)
                            .max(Comparator.comparing(Assignee::getFinishedAt))
                            .map(Assignee::getStartedAt).orElse(null))
                    .build();
        }

    }

    @Builder
    public record ScreenIssueResponse(Long id, String issueName, String description,
                                      String epic, LocalDateTime createdAt,
                                      PriorityType priority,
                                      List<ConnectedFeatureIssueResponse> features,
                                      List<JobResponse> jobs) {

        public static ScreenIssueResponse from(Issue issue) {
            return ScreenIssueResponse.builder()
                    .id(issue.getId())
                    .issueName(issue.getIssueName())
                    .description(issue.getDescription())
                    .epic(issue.getEpic())
                    .createdAt(issue.getCreatedAt())
                    .priority(issue.getPriority())
                    .features(issue.getScreenStoryboards().stream()
                            .map(ConnectedFeatureIssueResponse::from).toList())
                    .jobs(issue.getJobs().stream().map(JobResponse::from).toList())
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

    @Builder
    private record ConnectedScreenIssueResponse(Long connectionId,
                                                SimpleIssueResponse screenIssueResponse) {

        public static ConnectedScreenIssueResponse from(Storyboard storyboard) {
            return ConnectedScreenIssueResponse.builder()
                    .connectionId(storyboard.getId())
                    .screenIssueResponse(SimpleIssueResponse.from(storyboard.getScreenIssue()))
                    .build();
        }
    }

    @Builder
    private record ConnectedFeatureIssueResponse(Long connectionId,
                                                 SimpleIssueResponse featureIssueResponse) {

        public static ConnectedFeatureIssueResponse from(Storyboard storyboard) {
            return ConnectedFeatureIssueResponse.builder()
                    .connectionId(storyboard.getId())
                    .featureIssueResponse(SimpleIssueResponse.from(storyboard.getFeatureIssue()))
                    .build();
        }
    }
}
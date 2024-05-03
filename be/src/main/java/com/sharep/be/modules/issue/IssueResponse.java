package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.ApiResponse;
import com.sharep.be.modules.assignee.AssigneeResponse;
import com.sharep.be.modules.assignee.State;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.job.JobResponse;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record IssueResponse(Long id, String issueName, String description, IssueType type,
                            String epic, State state, LocalDateTime createdAt,
                            PriorityType priority, ApiResponse api,
                            List<AssigneeResponse> assignees, List<JobResponse> jobs) {

    @Builder
    public record IssueCreated(Long id) {

    }

    @Builder
    public record PrivateIssueResponse(Long id, String issueName, String description,
                                       IssueType type, String epic, State state,
                                       LocalDateTime createdAt, PriorityType priority,
                                       List<AssigneeResponse> assignees, List<JobResponse> jobs) {


    }
}

package com.sharep.be.modules.issue.dto;

import com.sharep.be.modules.issue.type.IssueState;
import com.sharep.be.modules.issue.type.PriorityType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class FeatureDto {

    private Long id;
    private String epic;
    private String issueName;
    private PriorityType priority;
    private List<ScreenResponseDto> screenIssues;
    private IssueState state;
    private List<AssignedMemberResponseDto> assignees;
    private LocalDateTime startedTime;
    private LocalDateTime finishedTime;

    @Builder
    public FeatureDto(String epic, String issueName, PriorityType priority,
            List<ScreenResponseDto> screenIssues, IssueState state,
            List<AssignedMemberResponseDto> assignees,
            LocalDateTime startedTime, LocalDateTime finishedTime) {
        this.epic = epic;
        this.issueName = issueName;
        this.priority = priority;
        this.screenIssues = screenIssues;
        this.state = state;
        this.assignees = assignees;
        this.startedTime = startedTime;
        this.finishedTime = finishedTime;
    }
}

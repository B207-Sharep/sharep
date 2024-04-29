package com.sharep.be.modules.issue;

import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.project.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class IssueDto {

    public static Issue toEntity(IssueRequestDto issueRequestDto, Project project) {
        return Issue.builder().issueName(issueRequestDto.getIssueName())
                .description(issueRequestDto.getDescription()).type(issueRequestDto.getType())
                .epic(issueRequestDto.getEpic()).priority(issueRequestDto.getPriority())
                .project(project).build();
    }

    public static IssueResponseDto toDto(Issue issue) {
        IssueResponseDto issueResponseDto = new IssueResponseDto();
        issueResponseDto.setId(issue.getId());
        issueResponseDto.setIssueName(issue.getIssueName());
        issueResponseDto.setDescription(issue.getDescription());
        issueResponseDto.setType(issue.getType());
        issueResponseDto.setEpic(issue.getEpic());
        issueResponseDto.setPriority(issue.getPriority());
        issueResponseDto.setProjectId(issue.getProject().getId());

        return issueResponseDto;
    }

    @Data
    public static class IssueRequestDto {

        @NotBlank
        @Size(min = 1, max = 32)
        private String issueName;

        private String description;

        private IssueType type;

        private String epic;

        private PriorityType priority;

        private Long projectId;
    }

    @Data
    public static class IssueResponseDto {

        private Long id;

        private String issueName;

        private String description;

        private IssueType type;

        private String epic;

        private PriorityType priority;

        private Long projectId;
    }

}

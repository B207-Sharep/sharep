package com.sharep.be.modules.issue;

import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IssueRequest() {

    public record IssueCreate(@NotBlank @Size(min = 1, max = 32) String issueName,
                              String description, @NotNull IssueType type, String epic,
                              PriorityType priority) {

    }

    public record IssueUpdate(@NotBlank @Size(min = 1, max = 32) String issueName,
                              String description, String epic, PriorityType priority) {

    }
}

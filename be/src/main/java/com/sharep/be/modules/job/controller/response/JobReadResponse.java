package com.sharep.be.modules.job.controller.response;

import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.member.MemberResponse;
import java.time.LocalDateTime;

public record JobReadResponse(
        Long id,
        String name,

        String description,

        LocalDateTime createdAt,

        String imageUrl,

        Long issueId,

        IssueType type,

        MemberResponse member
) {
    public static JobReadResponse from(Job job){
        return new JobReadResponse(
                job.getId(),
                job.getName(),
                job.getDescription(),
                job.getCreatedAt(),
                job.getImageUrl(),
                job.getIssue().getId(),
                job.getIssue().getType(),
                MemberResponse.from(job.getMember())
        );
    }

}

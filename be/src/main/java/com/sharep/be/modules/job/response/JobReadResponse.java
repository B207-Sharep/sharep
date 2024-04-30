package com.sharep.be.modules.job.response;

import com.sharep.be.modules.job.Job;
import java.time.LocalDateTime;

public record JobReadResponse(
        Long id,
        String name,

        String description,

        LocalDateTime createdAt,

        String imageUrl,

        Long issueId,

        Long memberId
) {
    public JobReadResponse from(Job job){
        return new JobReadResponse(
                job.getId(),
                job.getName(),
                job.getDescription(),
                job.getCreatedAt(),
                job.getImageUrl(),
                job.getIssue().getId(),
                job.getMember().getId()
        );
    }

}

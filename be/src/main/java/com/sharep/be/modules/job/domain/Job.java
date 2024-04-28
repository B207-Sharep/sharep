package com.sharep.be.modules.job.domain;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Member;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record Job(Long id, String name, String description, LocalDateTime createdAt,
                  String imageUrl, Issue issue, Member member) {

    public static Job from(JobCreate jobCreate, String imageUrl) {
        return Job.builder()
                .name(jobCreate.getName())
                .description(jobCreate.getDescription())
                .imageUrl(imageUrl)
                .build();
    }
}

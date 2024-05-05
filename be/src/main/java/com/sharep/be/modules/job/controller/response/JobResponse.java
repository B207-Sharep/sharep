package com.sharep.be.modules.job.controller.response;

import com.sharep.be.modules.job.domain.Job;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Builder;

@Builder
public record JobResponse(Long id, String name, String description, LocalDateTime createdAt,
                          String imageUrl) {

    public static JobResponse from(Job job) {
        return Optional.of(
                JobResponse.builder()
                        .id(job.getId())
                        .name(job.getName())
                        .description(job.getDescription())
                        .createdAt(job.getCreatedAt())
                        .imageUrl(job.getImageUrl())
                        .build()
        ).orElse(null);
    }
}

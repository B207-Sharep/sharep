package com.sharep.be.modules.job;

import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Builder;

@Builder
public record JobResponse(Long id, String name, String description, LocalDateTime createdAt,
                          String imageUrl) {

    public static JobResponse from(Job job) {
        return Optional.ofNullable(job)
                .map(j -> JobResponse.builder()
                        .id(j.getId())
                        .name(j.getName())
                        .description(j.getDescription())
                        .createdAt(j.getCreatedAt())
                        .imageUrl(j.getImageUrl())
                        .build()
                ).orElse(null);
    }
}

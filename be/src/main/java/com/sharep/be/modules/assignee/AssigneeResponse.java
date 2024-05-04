package com.sharep.be.modules.assignee;

import java.util.Optional;
import lombok.Builder;

@Builder
public record AssigneeResponse(String name, String imageUrl) {

    public static AssigneeResponse from(Assignee assignee) {
        return Optional.of(
                AssigneeResponse.builder()
                        .name(assignee.getMember().getAccount().getNickname())
                        .imageUrl(assignee.getMember().getAccount().getImageUrl())
                        .build()
        ).orElse(null);
    }

}

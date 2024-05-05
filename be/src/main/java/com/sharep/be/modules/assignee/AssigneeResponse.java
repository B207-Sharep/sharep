package com.sharep.be.modules.assignee;

import java.util.Optional;
import lombok.Builder;

@Builder
public record AssigneeResponse(String name, String imageUrl) {

    public static AssigneeResponse from(Assignee assignee) {
        return Optional.ofNullable(assignee)
                .map(a -> AssigneeResponse.builder()
                        .name(a.getMember().getAccount().getNickname())
                        .imageUrl(a.getMember().getAccount().getImageUrl())
                        .build()
                ).orElse(null);
    }

}

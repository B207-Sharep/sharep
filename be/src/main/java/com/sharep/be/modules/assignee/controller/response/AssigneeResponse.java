package com.sharep.be.modules.assignee.controller.response;

import com.sharep.be.modules.assignee.domain.Assignee;
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

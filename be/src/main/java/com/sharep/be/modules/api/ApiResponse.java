package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
import com.sharep.be.modules.assignee.AssigneeResponse;
import com.sharep.be.modules.assignee.State;
import java.util.List;
import java.util.Optional;
import lombok.Builder;

@Builder
public record ApiResponse(Long id, String request, String response, String url, MethodType method) {

    public static ApiResponse from(Api api) {
        return Optional.ofNullable(api)
                .map(a -> ApiResponse.builder()
                        .id(a.getId())
                        .request(a.getRequest())
                        .response(a.getResponse())
                        .url(a.getUrl())
                        .method(a.getMethod())
                        .build())
                .orElse(null);
    }

    @Builder
    public record ApiCreated(Long id) {

        public static ApiCreated from(Api api) {
            return ApiCreated.builder()
                    .id(api.getId())
                    .build();
        }
    }

    @Builder
    public record ApiDetailResponse(Long id, String epic, State state, MethodType method,
                                    String url, String description,
                                    String request, String response,
                                    List<AssigneeResponse> assignees) {

        public static ApiDetailResponse from(Api api) {
            return ApiDetailResponse.builder()
                    .id(api.getId())
                    .epic(api.getIssue().getEpic())
                    .state(api.getIssue().calculateState())
                    .method(api.getMethod())
                    .url(api.getUrl())
                    .description(api.getIssue().getDescription())
                    .request(api.getRequest())
                    .response(api.getResponse())
                    .assignees(api.getIssue().getAssignees().stream()
                            .map(AssigneeResponse::from).toList())
                    .build();
        }
    }
}

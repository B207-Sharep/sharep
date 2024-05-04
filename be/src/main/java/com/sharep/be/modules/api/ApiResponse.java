package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
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
}

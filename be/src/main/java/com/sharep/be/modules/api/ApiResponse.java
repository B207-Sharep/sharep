package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
import java.util.Optional;
import lombok.Builder;

@Builder
public record ApiResponse(Long id, String request, String response, String url, MethodType method) {

    public static ApiResponse from(Api api) {
        return Optional.of(
                ApiResponse.builder()
                        .id(api.getId())
                        .request(api.getRequest())
                        .response(api.getResponse())
                        .url(api.getUrl())
                        .method(api.getMethod())
                        .build()
        ).orElse(null);
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

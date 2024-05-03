package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
import lombok.Builder;

@Builder
public record ApiResponse(Long id, String request, String response, String url, MethodType method) {

    public static ApiResponse from(Api api) {
        return ApiResponse.builder()
                .id(api.getId())
                .request(api.getRequest())
                .response(api.getResponse())
                .url(api.getUrl())
                .method(api.getMethod())
                .build();
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

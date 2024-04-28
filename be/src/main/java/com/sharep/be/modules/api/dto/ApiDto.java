package com.sharep.be.modules.api.dto;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.api.type.MethodType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

public record ApiDto() {

    public static Api toEntity(ApiRequestDto apiRequestDto) {
        return Api.builder().request(apiRequestDto.request).response(apiRequestDto.response)
                .url(apiRequestDto.url).method(apiRequestDto.method).build();
    }

    public static ApiResponseDto toDto(Api api) {
        ApiResponseDto apiResponseDto = new ApiResponseDto();
        apiResponseDto.setId(apiResponseDto.getId());
        apiResponseDto.setRequest(apiResponseDto.getRequest());
        apiResponseDto.setResponse(apiResponseDto.getResponse());
        apiResponseDto.setUrl(apiResponseDto.getUrl());
        apiResponseDto.setMethod(apiResponseDto.getMethod());
        return apiResponseDto;
    }

    @Data
    public static class ApiRequestDto {

        @NotBlank
        private String request;

        private String response;

        @Size(max = 255)
        private String url;

        @Size(max = 6)
        private MethodType method;
    }

    @Data
    public static class ApiResponseDto {

        private Long id;

        private String request;

        private String response;

        private String url;

        private MethodType method;
    }

}

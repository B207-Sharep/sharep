package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Api {

    @Id
    private Long id;

    private String request;

    private String response;

    private String url;

    @Enumerated(EnumType.STRING)
    private MethodType method;

    @Builder
    public Api(String request, String response, String url, MethodType method) {
        this.request = request;
        this.response = response;
        this.url = url;
        this.method = method;
    }
}

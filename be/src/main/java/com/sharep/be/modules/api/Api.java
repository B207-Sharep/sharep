package com.sharep.be.modules.api;

import com.sharep.be.modules.api.type.MethodType;
import com.sharep.be.modules.issue.Issue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Api {

    @Id
    private Long id;

    private String request;

    private String response;

    private String url;

    @Enumerated(EnumType.STRING)
    private MethodType method;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id")
    private Issue issue;

    @Builder
    public Api(Long id, String request, String response, String url, MethodType method,
            Issue issue) {
        this.id = id;
        this.request = request;
        this.response = response;
        this.url = url;
        this.method = method;
        this.issue = issue;
    }
}

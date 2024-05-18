package com.sharep.be.modules.job.controller.request;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.member.Member;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record JobCreateRequest(

        @NotBlank
        @Size(min = 1, max = 100)
        String name,

        @NotNull
        String description
) {

    public Job toEntity(Member member, Issue issue, String imageUrl) {
        return Job.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .member(member)
                .issue(issue)
                .build();
    }
}
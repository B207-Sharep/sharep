package com.sharep.be.modules.member;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueNowResponse;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Builder;

public record MemberWithIssueResponse(
        MemberResponse member,
        Set<IssueNowResponse> issues
) {
    @Builder
    public MemberWithIssueResponse(Member member, Set<Issue> issues) {
        this(MemberResponse.from(member), issues.isEmpty() ? null : issues.stream()
                .map(IssueNowResponse::from).collect(Collectors.toSet()));
    }
}

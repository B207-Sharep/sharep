package com.sharep.be.modules.assignee.controller.response;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueNowResponse;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberResponse;
import lombok.Builder;

@Builder
public record AssigneeProjectNowIssueResponse(MemberResponse member,
                                              IssueNowResponse issue) {

    public AssigneeProjectNowIssueResponse(Member member, Issue issue) {
        this(MemberResponse.from(member), issue == null ? null : IssueNowResponse.from(issue));
    }

}


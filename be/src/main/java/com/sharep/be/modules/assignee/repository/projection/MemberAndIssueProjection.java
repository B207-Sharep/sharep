package com.sharep.be.modules.assignee.repository.projection;

import static org.springframework.util.Assert.notNull;

import com.sharep.be.modules.assignee.controller.response.AssigneeProjectNowIssueResponse;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueNowResponse;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberResponse;

public record MemberAndIssueProjection(
        Member member,
        Assignee assignee,
        Issue issue
) {
    public AssigneeProjectNowIssueResponse toAssigneeProjectNowIssueResponse(){
        notNull(member, "해당하는 구성원이 없습니다.");

        return AssigneeProjectNowIssueResponse.builder()
                .member(MemberResponse.from(member))
                .issue(issue == null ? null : IssueNowResponse.from(issue))
                .build();
    }


}

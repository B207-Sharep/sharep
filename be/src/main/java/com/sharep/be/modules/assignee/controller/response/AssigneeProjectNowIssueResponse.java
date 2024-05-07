package com.sharep.be.modules.assignee.controller.response;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueNowResponse;
import lombok.Builder;

@Builder
public record AssigneeProjectNowIssueResponse(AccountResponseDto account,
                                              IssueNowResponse issue) {

    public AssigneeProjectNowIssueResponse(Account account, Issue issue) {
        this(AccountDto.toDto(account), issue == null ? null : IssueNowResponse.from(issue));
    }

}


package com.sharep.be.modules.notification.domain;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.member.Role.RoleType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record NotificationMessage(
        Long accountId,
        String nickname,
        List<RoleType> roles,
        Long issueId,
        String issueName,
        LocalDateTime finishedAt,
        boolean isRead
) {
    public static NotificationMessage from(Account account, Member member, Assignee assignee, Issue issue){
        return NotificationMessage.builder()
                .accountId(account.getId())
                .nickname(account.getNickname())
                .roles(
                        member.getRoles().stream()
                                .map(Role::getRole)
                                .toList()
                )
                .issueId(issue.getId())
                .issueName(issue.getIssueName())
                .finishedAt(assignee.getFinishedAt())
                .isRead(false)
                .build();
    }
}

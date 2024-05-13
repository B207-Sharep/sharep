package com.sharep.be.modules.notification.domain;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.member.Role.RoleType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record NotificationMessage(
        Long notificationId,
        Long accountId,
        String nickname,
        List<RoleType> roles,
        Long issueId,
        IssueType type,
        String issueName,
        LocalDateTime finishedAt,
        String message,
        boolean isRead
) {
    public static NotificationMessage from(Notification notification, Account account, Member member, Assignee assignee, Issue issue){
        return NotificationMessage.builder()
                .notificationId(notification.getId())
                .accountId(account.getId())
                .nickname(account.getNickname())
                .roles(
                        member.getRoles().stream()
                                .map(Role::getRole)
                                .toList()
                )
                .issueId(issue.getId())
                .type(issue.getType())
                .issueName(issue.getIssueName())
                .finishedAt(assignee.getFinishedAt())
                .message(account.getNickname() + "님이 " + issue.getIssueName() + "를 완료했습니다.")
                .isRead(false)
                .build();
    }

    public static NotificationMessage from(Notification notification, Assignee assignee){
        return from(
                notification,
                assignee.getMember().getAccount(),
                assignee.getMember(),
                assignee,
                assignee.getIssue()
        );
    }
}

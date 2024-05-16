package com.sharep.be.modules.notification.service;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.service.IssueService;
import com.sharep.be.modules.issue.type.DataType;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.notification.controller.NotificationService;
import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final IssueService issueService;

    private final AccountIdEmitterRepository accountIdEmitterRepository;
    private final ProjectIdEmitterRepository projectIdEmitterRepository;
    private final NotificationRepository notificationRepository;
    private final AssigneeRepository assigneeRepository;
    private final MemberRepository memberRepository;

    public SseEmitter subscribeAccountId(Long projectId, Long accountId) {
        SseEmitter emitter = createAccountIdEmitter(accountId);

        List<NotificationMessage> notificationMessages = notificationRepository.findAllByProjectIdAndAccountId(
                        projectId, accountId).stream()
                .map(NotificationMessage::from)
                .toList();

        notifyAccountId(
                accountId,
                notificationMessages
        );

        return emitter;
    }

    public void notifyAccountId(Long userId, Object data) {
        sendToAccountIdClient(userId, data);
    }

    private void sendToAccountIdClient(Long accountId, Object data) {
        SseEmitter emitter = accountIdEmitterRepository.get(accountId);
        if (emitter != null) {
            try {
                emitter.send(
                        SseEmitter.event().id(String.valueOf(accountId)).name("sse").data(data));
            } catch (IOException exception) {
                accountIdEmitterRepository.deleteById(accountId);
                emitter.completeWithError(exception);
            }
        }
    }

    private void sendToProjectIdClient(Long ProjectId, Object data) {
        SseEmitter emitter = projectIdEmitterRepository.get(ProjectId);
        if (emitter != null) {
            try {
                emitter.send(
                        SseEmitter.event().id(String.valueOf(ProjectId)).name("sse").data(data));
            } catch (IOException exception) {
                projectIdEmitterRepository.deleteById(ProjectId);
                emitter.completeWithError(exception);
            }
        }
    }

    private SseEmitter createAccountIdEmitter(Long id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        accountIdEmitterRepository.save(id, emitter);

        emitter.onCompletion(() -> accountIdEmitterRepository.deleteById(id));
        emitter.onTimeout(() -> accountIdEmitterRepository.deleteById(id));

        return emitter;
    }

    private SseEmitter getProjectIdEmitter(Long projectId) {
        SseEmitter emitter = projectIdEmitterRepository.get(projectId);

        if (emitter == null) {
            SseEmitter newEmitter = new SseEmitter(DEFAULT_TIMEOUT);

            projectIdEmitterRepository.save(projectId, newEmitter);

            newEmitter.onCompletion(() -> projectIdEmitterRepository.deleteById(projectId));
            newEmitter.onTimeout(() -> projectIdEmitterRepository.deleteById(projectId));

            return newEmitter;
        }

        return emitter;
    }

    public Long updateNotificationState(Long accountId, Long notificationId) {
        Notification notification = notificationRepository.findByIdAndMemberAccountId(
                        notificationId, accountId)
                .orElseThrow(() -> new RuntimeException("해당하는 알림이 없습니다."));

        notification.readNotification();

        return notificationId;
    }

    public void sendToAccountIds(Long projectId, Long issueId, Long accountId, Long[] accountIds) {

        Assignee assignee = assigneeRepository.findByMemberProjectIdAndIssueIdAndMemberAccountId(
                        projectId, issueId, accountId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 없습니다."));

        List<Member> targetMembers = memberRepository.findAllByProjectIdAndAccountIdIn(projectId,
                Arrays.asList(accountIds));
        System.out.println(targetMembers.size());

        for (Member targetMember : targetMembers) {

            Notification notification = Notification.builder()
                    .assignee(assignee)
                    .isRead(false)
                    .member(targetMember)
                    .build();

            Notification notification1 = notificationRepository.save(notification);

            notifyAccountId(
                    targetMember.getAccount().getId(),
                    NotificationMessage.from(notification1)
            );

        }
    }

    @Override
    public SseEmitter subscribeProjectId(Long projectId) {
        SseEmitter emitter = getProjectIdEmitter(projectId);

        List<IssueResponse> data = issueService.getIssues(projectId, null, IssueType.FEATURE,
                        DataType.DETAIL).stream()
                .map(IssueResponse::from)
                .toList();

        sendToProjectIdClient(projectId, data);

        return emitter;
    }

    @Override
    public void updateIssue(Long projectId, Long issueId, IssueUpdate issueUpdate) {
        issueService.updateIssue(issueId, issueUpdate);

        List<IssueResponse> data = issueService.getIssues(projectId, null, IssueType.FEATURE,
                        DataType.DETAIL).stream()
                .map(IssueResponse::from)
                .toList();

        sendToProjectIdClient(projectId, data);
    }

}

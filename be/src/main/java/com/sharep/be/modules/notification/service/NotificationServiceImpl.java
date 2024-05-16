package com.sharep.be.modules.notification.service;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.notification.controller.NotificationService;
import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.domain.NotificationRefetchMessage;
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
        System.out.println(emitter);
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

    private void sendToProjectIdClient(Long memberId, Object data) {
        SseEmitter emitter = projectIdEmitterRepository.get(memberId);

        if (emitter != null) {
            try {
                emitter.send(
                        SseEmitter.event().id(String.valueOf(memberId)).name("sse").data(data));
            } catch (IOException exception) {
                projectIdEmitterRepository.deleteById(memberId);
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
    public SseEmitter subscribeProjectId(Long projectId, Long accountId) {
        SseEmitter emitter = getProjectIdEmitter(projectId);

        Long memberId = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."))
                .getId();

        sendToProjectIdClient(memberId, new NotificationRefetchMessage());

        System.out.println(emitter);
        return emitter;
    }

    @Override
    public void updateIssue(Long projectId) {
        memberRepository.findAllByProjectId(projectId)
                .forEach(member -> sendToProjectIdClient(member.getId(), new NotificationRefetchMessage()));
    }

}

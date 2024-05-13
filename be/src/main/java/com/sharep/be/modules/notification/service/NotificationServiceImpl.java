package com.sharep.be.modules.notification.service;

import static io.jsonwebtoken.lang.Assert.notNull;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.notification.controller.NotificationService;
import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import java.io.IOException;
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

    public SseEmitter subscribeAccountId(Long projectId, Long accountId) {
        SseEmitter emitter = createAccountIdEmitter(accountId);

        List<NotificationMessage> notificationMessages = notificationRepository.findAllByProjectIdAndAccountId(
                        projectId, accountId).stream()
                .map(notification -> {
                    Member anotherMember = notification.getMember();
                    Assignee anotherAssignee = notification.getAssignee();
                    Issue anotherIssue = anotherAssignee.getIssue();
                    Account anotherAccount = anotherMember.getAccount();

                    notNull(anotherAccount);
                    notNull(anotherMember);
                    notNull(anotherAssignee);
                    notNull(anotherIssue);

                    return NotificationMessage.from(notification, anotherAccount, anotherMember,
                            anotherAssignee, anotherIssue);
                })
                .toList();

        notifyAccountId(
                accountId,
                notificationMessages
        );

        return emitter;
    }

    public void notifyAccountId(Long userId, Object data) {
        sendToClient(userId, data);
    }

    private void sendToClient(Long id, Object data) {
        SseEmitter emitter = accountIdEmitterRepository.get(id);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(id)).name("sse").data(data));
            } catch (IOException exception) {
                accountIdEmitterRepository.deleteById(id);
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

        List<Assignee> assignees = assigneeRepository.findAllByProjectIdAndIssueIdAndAccountIdsIn(projectId, issueId, accountIds);

        Assignee assignee = assigneeRepository.findByMemberProjectIdAndIssueIdAndMemberAccountId(projectId, issueId, accountId);
        for(Assignee assignee: assignees){
            Notification notification = Notification.builder()
                .assignee(assignee)
                .isRead(false)
                .member(assignee.getMember())
                .build();

            notificationRepository.save(notification);

            notifyAccountId(
                    assignee.getMember().getAccount().getId(),
                    NotificationMessage.from(
                            notification,
                            assignee
                    )
            );
        }
    }

    @Override
    public SseEmitter subscribeProjectId(Long projectId) {
        return createProjectIdEmitter(projectId);
    }

    @Override
    public void updateIssue(Long projectId, IssueUpdate issueUpdate) {

    }

}

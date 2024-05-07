package com.sharep.be.modules.notification.service;

import static io.jsonwebtoken.lang.Assert.notNull;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.repository.EmitterRepository;
import com.sharep.be.modules.notification.repository.NotificationRepository;
import jakarta.validation.constraints.Min;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    public SseEmitter subscribe(Long projectId, Long accountId) {
        SseEmitter emitter = createEmitter(accountId);

        List<NotificationMessage> notificationMessages = notificationRepository.findAllByProjectIdAndAccountId(projectId, accountId).stream()
                        .map(notification -> {
                            Member anotherMember = notification.getMember();
                            Assignee anotherAssignee = notification.getAssignee();
                            Issue anotherIssue = anotherAssignee.getIssue();
                            Account anotherAccount = anotherMember.getAccount();

                            notNull(anotherAccount);
                            notNull(anotherMember);
                            notNull(anotherAssignee);
                            notNull(anotherIssue);

                            return NotificationMessage.from(notification, anotherAccount, anotherMember, anotherAssignee, anotherIssue);
                        })
                        .toList();

        notify(
                accountId,
                notificationMessages
        );


        return emitter;
    }

    public void notify(Long userId, Object data) {
        sendToClient(userId, data);
    }

    private void sendToClient(Long id, Object data) {
        SseEmitter emitter = emitterRepository.get(id);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(id)).name("sse").data(data));
            } catch (IOException exception) {
                emitterRepository.deleteById(id);
                emitter.completeWithError(exception);
            }
        }
    }

    private SseEmitter createEmitter(Long id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(id, emitter);

        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        return emitter;
    }

    public Long updateNotificationState(Long accountId, Long notificationId) {
        Notification notification = notificationRepository.findByIdAndMemberAccountId(notificationId, accountId)
                .orElseThrow(() -> new RuntimeException("해당하는 알림이 없습니다."));

        notification.readNotification();

        return notificationId;
    }
}

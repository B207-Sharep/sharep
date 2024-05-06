package com.sharep.be.modules.notification.service;

import static io.jsonwebtoken.lang.Assert.notNull;

import com.querydsl.core.Tuple;
import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.repository.EmitterRepository;
import com.sharep.be.modules.notification.repository.NotificationRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    public SseEmitter subscribe(Long projectId, Long accountId) {
        SseEmitter emitter = createEmitter(accountId);

        List<Tuple> notifications = notificationRepository.findALlByProjectIdAndAccountId(projectId, accountId);

        for(Tuple notification : notifications){
            Account anotherAccount = notification.get(0, Account.class);
            Member anotherMember = notification.get(1, Member.class);
            Assignee anotherAssignee = notification.get(2, Assignee.class);
            Issue anotherIssue = notification.get(3, Issue.class);

            notNull(anotherAccount);
            notNull(anotherMember);
            notNull(anotherAssignee);
            notNull(anotherIssue);

            notify(
                    accountId,
                    NotificationMessage.from(anotherAccount, anotherMember, anotherAssignee, anotherIssue)
            );
        }

        return emitter;
    }

    public void notify(Long userId, NotificationMessage notificationMessage) {
        sendToClient(userId, notificationMessage);
    }

    private void sendToClient(Long id, NotificationMessage notificationMessage) {
        SseEmitter emitter = emitterRepository.get(id);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(id)).name("sse").data(notificationMessage));
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

}

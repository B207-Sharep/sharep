package com.sharep.be.modules.notification.controller;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

    SseEmitter subscribeAccountId(Long projectId, Long accountId);

    void notifyAccountId(Long accountId, Object data);

    Long updateNotificationState(Long accountId, Long notificationId);

    void sendToAccountIds(Long projectId, Long issueId, Long accountId, Long[] accountIds);

    SseEmitter subscribeProjectId(Long projectId, Long accountId);

    void updateIssue(Long projectId);
}

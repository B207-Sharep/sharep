package com.sharep.be.modules.notification.controller;

import com.sharep.be.modules.notification.controller.response.NotificationIdResponse;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // 알림 구독하기
    @GetMapping(value = "/projects/{projectId}/accounts/subscriptions", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribeAccountId(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable @Min(1) Long projectId
    ) {

        return ResponseEntity
                .ok(notificationService.subscribeAccountId(projectId, authentication.id));
    }

    // 알림 읽은 상태로 변경
    @PatchMapping("/{notificationId}")
    public ResponseEntity<NotificationIdResponse> updateNotificationState(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable @Min(1) Long notificationId
    ) {

        Long result = notificationService.updateNotificationState(authentication.id,
                notificationId);

        return ResponseEntity.ok(
                NotificationIdResponse.builder()
                        .notificationId(result)
                        .build()
        );
    }

// 선택된 여러명에게 알림보내기
    @PostMapping("/projects/{projectId}/issues/{issueId}/send")
    public ResponseEntity<Void> sendToAccountIds(
            @PathVariable Long projectId,
            @PathVariable Long issueId,
            @AuthenticationPrincipal JwtAuthentication authentication,
            Long[] accountIds
    ){

        notificationService.sendToAccountIds(projectId, issueId, authentication.id, accountIds);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 동시작업 시 알림 구독
    @GetMapping(value = "/projects/{projectId}/subscriptions", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribeProjectId(
            @PathVariable Long projectId
    ){

        return ResponseEntity
                .ok(notificationService.subscribeProjectId(projectId));
    }


    // 동시작업 시 이슈 수정 후 알림 보내기
    @PostMapping("/projects/{projectId}")
    public ResponseEntity<Void> sendToProjectId(
            @PathVariable Long projectId
    ){

        notificationService.updateIssue(projectId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}


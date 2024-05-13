package com.sharep.be.modules.notification.controller;

import com.sharep.be.modules.notification.service.NotificationService;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.constraints.Min;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/projects/{projectId}/subscriptions", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable @Min(1) Long projectId
    ) {

        return notificationService.subscribe(projectId, authentication.id);
    }

    @PostMapping("/{notificationId}")
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

    @PostMapping("/projects/{projectId}/issues/{issueId}/send")
    public ResponseEntity<Void> sendNotification(
            @PathVariable Long projectId,
            @PathVariable Long issueId,
            Long[] accountIds
    ){

        notificationService.sendToAccountIds(projectId, issueId, accountIds);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

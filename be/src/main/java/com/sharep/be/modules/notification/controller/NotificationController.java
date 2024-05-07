package com.sharep.be.modules.notification.controller;

import com.sharep.be.modules.notification.service.NotificationService;
import com.sharep.be.modules.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

    @GetMapping(value = "/projects/{projectId}/subscriptions", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId
    ) {

        return notificationService.subscribe(projectId, authentication.id);
    }

}

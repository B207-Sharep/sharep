package com.sharep.be.modules.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AccountIdEmitterRepository {

    void save(Long id, SseEmitter emitter);

    void deleteById(Long id);

    SseEmitter get(Long id);
}

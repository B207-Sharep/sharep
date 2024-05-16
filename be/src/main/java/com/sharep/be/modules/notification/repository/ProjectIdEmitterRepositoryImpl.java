package com.sharep.be.modules.notification.repository;

import com.sharep.be.modules.notification.service.ProjectIdEmitterRepository;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class ProjectIdEmitterRepositoryImpl implements ProjectIdEmitterRepository {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(Long memberId, SseEmitter emitter) {
        emitters.put(memberId, emitter);
    }

    public void deleteById(Long memberId) {
        emitters.remove(memberId);
    }

    public SseEmitter get(Long memberId) {
        return emitters.get(memberId);
    }
}

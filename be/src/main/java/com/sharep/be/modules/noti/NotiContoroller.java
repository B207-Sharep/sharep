package com.sharep.be.modules.noti;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class NotiContoroller {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @GetMapping("/sse")
    public SseEmitter createSseEmitter() {
        SseEmitter emitter = new SseEmitter();

        emitters.add(emitter);

        //콜백함수 등록
        emitter.onCompletion(() -> {
            this.emitters.remove(emitter);
        });
        emitter.onTimeout(() -> {
            emitter.complete();
        });

        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected")); //503 에러 방지를 위한 더미 데이터
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return emitter;
    }

//다른 Thread
//try {
//        emitter.send(SseEmitter.event()
//                .name("notifications")
//                .data(클라이언트에게 보낼 알림));
//    } catch (IOException e) {
//        throw new RuntimeException(e);
//    }

}

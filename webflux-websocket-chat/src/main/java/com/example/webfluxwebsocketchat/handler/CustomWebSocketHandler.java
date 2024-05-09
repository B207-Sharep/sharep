package com.example.webfluxwebsocketchat.handler;

import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import jdk.jshell.spi.ExecutionControl.UserException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@Component
@Slf4j
public class CustomWebSocketHandler implements WebSocketHandler {
//    @Override
//    public Mono<Void> handle(WebSocketSession session) {
//
//        Flux<WebSocketMessage> output = session.receive()
//                .doOnNext(message -> {
                    // ...
//                })
//                .concatMap(message -> {
                    // ...
//                })
//                .map(value -> session.textMessage("Echo 2" + value.getPayloadAsText()));
//
//        return session.send(output);
//    }
//
    private final Map<String, Many<String>> sink;
    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://share-p.com/api")
            .defaultHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MUBuYXZlci5jb20iLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzE1MjE3MzA5LCJleHAiOjE4MDE2MTczMDl9.za14B0_e0G5_CShA9j3-HAOfcXnCQ_qG7WQb9nchgS8")
            .build();


    public CustomWebSocketHandler(Map<String, Sinks.Many<String>> sink) {
        this.sink = sink;
    }
//
    @Override
    public Mono<Void> handle(WebSocketSession session) {
        var output = session.receive()
                .map(WebSocketMessage::getPayloadAsText);
//                .map(e -> {
//                    try {
//                        JSONObject json = new JSONObject(e);
//                        String username = json.getString("username");
//                        if (username.equals("")) username = "익명";
//                        String message = json.getString("message");
//                        return username + ": " + message;
//                    } catch (JSONException ex) {
//                        ex.printStackTrace();
//                        return "메시지 처리 중 오류 발생";
//                    }
//                });

        String hand = session.getHandshakeInfo().toString();
        String projectId = extractProjectId(hand);
        System.out.println("projectId: " + projectId);

//        System.out.println(
                webClient.get()
                        .uri("/projects/" + projectId + "/issues")
                        .retrieve().bodyToMono(String.class)
                        .subscribe(System.out::println);
//        );
//        Random random = new Random();

//        String key = random.nextBoolean() ? "1" : "2";
//        System.out.println(key);

        if(!sink.containsKey(projectId))
            sink.put(projectId, Sinks.many().multicast().directBestEffort());

        Sinks.Many<String> nowSink = sink.get(projectId);

        output.subscribe(s -> sink.get(projectId).emitNext(s, Sinks.EmitFailureHandler.FAIL_FAST));

//        output.subscribe(System.out::println);
//        System.out.println(session.getAttributes());
//        System.out.println(session.getHandshakeInfo());



//        System.out.println(extractProjectId(hand));
//        System.out.println(session.getId());
//        System.out.println(session.);


        return session.send(sink.get(projectId).asFlux().map(session::textMessage));
    }

    private static String extractProjectId(String input) {
        // 정규식 패턴 생성
        Pattern pattern = Pattern.compile("projectId=(\\d+)");
        Matcher matcher = pattern.matcher(input);

        // 패턴 매칭 및 추출
        if (matcher.find()) {
            return matcher.group(1); // 첫 번째 그룹에 해당하는 값 반환
        } else {
            return null; // 매칭되는 값이 없을 경우 null 반환하거나 예외 처리
        }
    }
}

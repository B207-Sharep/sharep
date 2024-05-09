package com.example.webfluxwebsocketchat.config;

import java.util.HashMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import reactor.core.publisher.Sinks;

import java.util.Map;

@Configuration
public class WebsocketConfig {

    @Bean
    public SimpleUrlHandlerMapping handlerMapping(WebSocketHandler wsh) {
        return new SimpleUrlHandlerMapping(Map.of("/ws-chat", wsh), 1);
    }

    @Bean
    public WebSocketHandlerAdapter webSocketHandlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

    @Bean
    public Map<String, Sinks.Many<String>> sink() {
//        return Sinks.many().multicast().directBestEffort();
        Map<String, Sinks.Many<String>> result = new HashMap<>();
//        result.put("1", Sinks.many().multicast().directBestEffort());

        return result;
    }

}

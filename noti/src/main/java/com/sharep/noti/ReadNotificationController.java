package com.sharep.noti;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class ReadNotificationController {
  private final SendSSEProcessor sendSSEProcessor;
  
  @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<ServerSentEvent<Object>> sseConnect(
		@RequestParam("userId") String userId) {
    return sendSSEProcessor.connect(userId);
  }

  @GetMapping(value = "/sse/connect")
  public Mono<ResponseEntity<Boolean>> sseSuccessConnection(
          @RequestParam("userId") String userId
  ) {
    return sendSSEProcessor.successMessageSend(userId)
            .map(isSuccess -> new ResponseEntity<>(isSuccess, HttpStatus.OK));
  }
}
package com.sharep.be.modules.gpt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class GptResponse {
    private String id;
    private String object;
    private Long created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    @JsonProperty("system_fingerprint")
    private String systemFingerprint;

    @Getter
    @Setter
    @ToString
    public static class Choice {
        private int index;
        private Message message;
        private Object logprobs; // Generic Object since null in provided JSON, modify as needed.
        @JsonProperty("finish_reason")
        private String finishReason;
    }

    @Getter
    @Setter
    @ToString
    public static class Message {
        private String role;
        private String content;

    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Usage {
        @JsonProperty("prompt_tokens")
        private int promptTokens;
        @JsonProperty("completion_tokens")
        private int completionTokens;
        @JsonProperty("total_tokens")
        private int totalTokens;

    }
}

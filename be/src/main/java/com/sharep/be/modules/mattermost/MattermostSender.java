package com.sharep.be.modules.mattermost;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharep.be.infra.config.MattermostProperties;
import com.sharep.be.modules.mattermost.MatterMostMessageDto.Attachment;
import com.sharep.be.modules.mattermost.MatterMostMessageDto.Attachments;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
class MatterMostSender {


    @Value("${notification.mattermost.enabled}")
    private boolean mmEnabled;
    @Value("${notification.mattermost.webhook-url}")
    private String webhookUrl;

    private final MattermostProperties mmProperties;
    private final ObjectMapper objectMapper;

    public void sendErrorMessage(Exception excpetion, String uri, String params) {
        if (!mmEnabled)
            return;

        try {
            Attachment attachment = Attachment.builder()
                    .channel(mmProperties.getChannel())
                    .authorIcon(mmProperties.getAuthorIcon())
                    .authorName(mmProperties.getAuthorName())
                    .color(mmProperties.getColor())
                    .pretext(mmProperties.getPretext())
                    .title(mmProperties.getTitle())
                    .text(mmProperties.getText())
                    .footer(mmProperties.getFooter())
                    .build();

            attachment.addExceptionInfo(excpetion, uri, params);
            Attachments attachments = new Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = objectMapper.writeValueAsString(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            new RestTemplate().postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }
    }

    public void sendSchedulerMessage() {
        if (!mmEnabled)
            return;

        try {
            Attachment attachment = Attachment.builder()
                    .channel(mmProperties.getChannel())
                    .authorIcon(mmProperties.getAuthorIcon())
                    .authorName(mmProperties.getAuthorName())
                    .color(mmProperties.getColor())
                    .pretext(mmProperties.getPretext())
                    .title(mmProperties.getTitle())
                    .text(mmProperties.getText())
                    .footer(mmProperties.getFooter())
                    .build();


            Attachments attachments = new Attachments();
            attachments.addProps(new RuntimeException("스케줄링 작업완료"));
            String payload = objectMapper.writeValueAsString(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            new RestTemplate().postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }
    }
}
package com.sharep.be.modules.mattermost;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class NotificationManager {


    private final MatterMostSender mmSender;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        mmSender.sendErrorMessage(e, uri, params);
    }

    public void sendScheduleNotification() {
        log.info("#### SEND Notification");
        mmSender.sendSchedulerMessage();
    }

}
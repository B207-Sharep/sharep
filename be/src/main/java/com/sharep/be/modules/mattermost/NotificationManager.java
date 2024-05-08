package com.sharep.be.modules.mattermost;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationManager {

    @Autowired
    private MatterMostSender mmSender;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        mmSender.sendErrorMessage(e, uri, params);
    }

    public void sendScheduleNotification() {
        log.info("#### SEND Notification");
        mmSender.sendSchedulerMessage();
    }

}
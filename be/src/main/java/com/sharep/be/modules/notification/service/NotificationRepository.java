package com.sharep.be.modules.notification.service;

import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.repository.NotificationRepositoryCustom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>,
        NotificationRepositoryCustom {

    Optional<Notification> findByIdAndMemberAccountId(Long notificationId, Long accountId);
}
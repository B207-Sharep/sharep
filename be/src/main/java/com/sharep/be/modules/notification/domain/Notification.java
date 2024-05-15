package com.sharep.be.modules.notification.domain;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@NoArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Assignee assignee;

    private boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public Notification(Assignee assignee, boolean isRead, Member member) {
        this.assignee = assignee;
        this.isRead = isRead;
        this.member = member;
    }

    public void readNotification() {
        isRead = true;
    }
}

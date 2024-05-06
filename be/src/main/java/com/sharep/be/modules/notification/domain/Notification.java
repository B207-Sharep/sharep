package com.sharep.be.modules.notification.domain;

import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Notification {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn
    @MapsId
    private Assignee assignee;

    private boolean isRead;

    @ManyToOne
    @JoinColumn
    private Member member;

}

package com.sharep.be.modules.assignee.domain;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Assignee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private State state;

    // FIXME 수정
    @CreatedDate
    private LocalDateTime startedAt;

    @LastModifiedDate
    private LocalDateTime finishedAt;

    @Builder
    public Assignee(Issue issue, Member member, State state, LocalDateTime startedAt,
            LocalDateTime finishedAt) {
        this.issue = issue;
        this.member = member;
        this.state = state;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
    }

    public void updateState(State state){
        this.state = state;
    }
}

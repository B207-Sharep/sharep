package com.sharep.be.modules.project;

import com.sharep.be.modules.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@Getter
public class Assignee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private Long issueId;

    private State state;

    private LocalDateTime startedAt;

    private LocalDateTime finishedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public enum State{
        YET, NOW, DONE
    }
}

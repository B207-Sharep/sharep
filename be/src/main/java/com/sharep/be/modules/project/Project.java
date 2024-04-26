package com.sharep.be.modules.project;

import com.sharep.be.modules.account.Account;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@Getter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "account_id", nullable = false)
    @ManyToOne
    private Account leader;

    @Size(min = 1, max = 100)
    @Column(nullable = false)
    private String title;

    @Size(min = 1, max = 100)
    @Column(nullable = false)
    private String bio;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private String secretKey;

    @Builder
    public Project(Account leader, String title, String bio) {
        this.leader = leader;
        this.title = title;
        this.bio = bio;
        this.createdAt = LocalDateTime.now(); // TODO auditing 달기
    }
}

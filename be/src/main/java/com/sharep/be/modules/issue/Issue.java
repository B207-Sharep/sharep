package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.project.Project;
import jakarta.persistence.Column;
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
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private Api api;

    @Column(length = 30)
    private String issueName;

    private String description;

    @Enumerated(EnumType.STRING)
    private IssueType type;

    @Column(length = 100)
    private String epic;

    @CreatedDate
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PriorityType priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public Issue(String issueName, String description, IssueType type, String epic,
            PriorityType priority, Project project) {
        this.issueName = issueName;
        this.description = description;
        this.type = type;
        this.epic = epic;
        this.createdAt = LocalDateTime.now();
        this.priority = priority;
        this.project = project;
    }
}

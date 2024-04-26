package com.sharep.be.modules.issue;

import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.project.Project;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String issueName;

    private String description;

    @Enumerated(EnumType.STRING)
    private IssueType type;

    @Column(length = 100)
    private String epic;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PriorityType priority;

    @ManyToOne
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

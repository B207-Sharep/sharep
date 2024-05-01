package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.storyboard.Storyboard;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDateTime;
import java.util.Set;
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

    @Column(length = 30)
    private String issueName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private IssueType type;

    @Column(length = 100)
    private String epic;

    @CreatedDate
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PriorityType priority;


    @OneToOne(mappedBy = "issue", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Api api;

    @OneToMany(mappedBy = "issue")
    private Set<Assignee> assignees;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Project project;

    @OneToMany(mappedBy = "featureIssue")
    private Set<Storyboard> storyboards;

    @Builder
    public Issue(String issueName, String description, IssueType type, String epic,
            PriorityType priority, Api api, Set<Assignee> assignees, Project project,
            Set<Storyboard> storyboards) {
        this.issueName = issueName;
        this.description = description;
        this.type = type;
        this.epic = epic;
        this.priority = priority;
        this.api = api;
        this.assignees = assignees;
        this.project = project;
        this.storyboards = storyboards;
    }

    public static Issue from(IssueCreate issueCreate, Project project) {
        return Issue.builder().issueName(issueCreate.issueName())
                .description(issueCreate.description()).type(issueCreate.type())
                .epic(issueCreate.epic()).priority(issueCreate.priority()).project(project).build();
    }

    public IssueCreated toCreated() {
        return IssueCreated.builder().id(id).build();
    }

    public IssueResponse toResponse() {
        return IssueResponse.builder().id(id).issueName(issueName).description(description)
                .type(type).epic(epic).priority(priority).projectId(project.getId()).build();
    }
}

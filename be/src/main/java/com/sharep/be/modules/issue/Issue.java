package com.sharep.be.modules.issue;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.assignee.Assignee;
import com.sharep.be.modules.assignee.AssigneeResponse;
import com.sharep.be.modules.assignee.State;
import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse.PrivateIssueResponse;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.issue.type.PriorityType;
import com.sharep.be.modules.job.Job;
import com.sharep.be.modules.job.JobResponse;
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
import java.util.EnumMap;
import java.util.Set;
import java.util.stream.Collectors;
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


    @OneToOne(mappedBy = "issue", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @PrimaryKeyJoinColumn
    private Api api;

    @OneToMany(mappedBy = "issue")
    private Set<Assignee> assignees;

    @OneToMany(mappedBy = "issue")
    private Set<Job> jobs;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Project project;

    @OneToMany(mappedBy = "featureIssue")
    private Set<Storyboard> storyboards;


    @Builder
    public Issue(Long id, String issueName, String description, IssueType type, String epic,
            LocalDateTime createdAt, PriorityType priority, Api api, Set<Assignee> assignees,
            Set<Job> jobs, Project project, Set<Storyboard> storyboards) {
        this.id = id;
        this.issueName = issueName;
        this.description = description;
        this.type = type;
        this.epic = epic;
        this.createdAt = createdAt;
        this.priority = priority;
        this.api = api;
        this.assignees = assignees;
        this.jobs = jobs;
        this.project = project;
        this.storyboards = storyboards;
    }

    public static Issue from(IssueCreate issueCreate, Project project) {
        return Issue.builder().issueName(issueCreate.issueName())
                .description(issueCreate.description()).type(issueCreate.type())
                .epic(issueCreate.epic()).priority(issueCreate.priority()).project(project).build();
    }

    public Issue from(IssueUpdate issueUpdate) {
        return Issue.builder().id(id).issueName(issueUpdate.issueName())
                .description(issueUpdate.description()).type(type).epic(issueUpdate.epic())
                .createdAt(createdAt).priority(issueUpdate.priority()).api(api).assignees(assignees)
                .jobs(jobs).project(project).storyboards(storyboards).build();
    }

    public Issue deleteApi() {
        return Issue.builder().id(id).issueName(issueName).description(description).type(type)
                .epic(epic).createdAt(createdAt).priority(priority).api(null).assignees(assignees)
                .jobs(jobs).project(project).storyboards(storyboards).build();
    }

    public IssueCreated toCreated() {
        return IssueCreated.builder().id(id).build();
    }

    public PrivateIssueResponse toPrivateIssueResponse() {
        return PrivateIssueResponse.builder().id(id).issueName(issueName).description(description)
                .type(type).epic(epic).createdAt(createdAt).priority(priority)
                .state(calculateState(assignees)).assignees(assignees.stream()
                        .map(assignee -> AssigneeResponse.builder()
                                .name(assignee.getMember().getAccount().getNickname())
                                .imageUrl(assignee.getMember().getAccount().getImageUrl()).build())
                        .toList()).jobs(jobs.stream()
                        .map(job -> JobResponse.builder().id(job.getId()).name(job.getName())
                                .description(job.getDescription()).createdAt(job.getCreatedAt())
                                .imageUrl(job.getImageUrl()).build()).toList()).build();
    }


    public IssueResponse toResponse() {
        return IssueResponse.builder().id(id).issueName(issueName).description(description)
                .type(type).epic(epic).createdAt(createdAt).priority(priority)
                .state(calculateState(assignees)).api(api.toResponse()).assignees(assignees.stream()
                        .map(assignee -> AssigneeResponse.builder()
                                .name(assignee.getMember().getAccount().getNickname())
                                .imageUrl(assignee.getMember().getAccount().getImageUrl()).build())
                        .toList()).jobs(jobs.stream()
                        .map(job -> JobResponse.builder().id(job.getId()).name(job.getName())
                                .description(job.getDescription()).createdAt(job.getCreatedAt())
                                .imageUrl(job.getImageUrl()).build()).toList()).build();
    }

    private State calculateState(Set<Assignee> assignees) {
        EnumMap<State, Long> stateCount = assignees.stream().collect(
                Collectors.groupingBy(Assignee::getState, () -> new EnumMap<>(State.class),
                        Collectors.counting()));

        long size = assignees.size();
        long done = stateCount.getOrDefault(State.DONE, 0L);
        long yet = stateCount.getOrDefault(State.YET, 0L);

        if (yet == size) {
            return State.YET;
        } else if (done == size) {
            return State.DONE;
        } else {
            return State.NOW;
        }
    }
}

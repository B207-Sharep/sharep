package com.sharep.be.modules.job.domain;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.job.controller.request.JobCreateRequest;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.project.dto.GitlabHook.Commit;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "job")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    private LocalDateTime createdAt;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Issue issue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;


    @Column(length = 100)
    private String commitId;

    public static Job from(JobCreateRequest jobCreateRequest, Member member, Issue issue, String imageUrl) {
        Job jobEntity = new Job();
        jobEntity.name = jobCreateRequest.name();
        jobEntity.description = jobCreateRequest.description();
        jobEntity.imageUrl = imageUrl;
        jobEntity.member = member;
        jobEntity.issue = issue;
        return jobEntity;
    }

    @Builder
    public Job(String name, String description, LocalDateTime createdAt, String imageUrl,
            Issue issue,
            Member member) {
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.imageUrl = imageUrl;
        this.issue = issue;
        this.member = member;
    }

    public static Job from(Member member, Issue issue, Commit commit){
        Job jobEntity = new Job();
        jobEntity.name = commit.getTitle();
        jobEntity.description = commit.getMessage();
        jobEntity.member = member;
        jobEntity.issue = issue;
        jobEntity.commitId = commit.getId();
        return jobEntity;
    }
}

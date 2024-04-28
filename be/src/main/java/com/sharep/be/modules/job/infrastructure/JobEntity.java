package com.sharep.be.modules.job.infrastructure;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "job")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class JobEntity {
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

    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public static JobEntity from(Job job) {
        JobEntity jobEntity = new JobEntity();
        jobEntity.id = job.id();
        jobEntity.name = job.name();
        jobEntity.description = job.description();
        jobEntity.createdAt = job.createdAt();
        jobEntity.imageUrl = job.imageUrl();
        jobEntity.issue = job.issue();
        jobEntity.member = job.member();
        return jobEntity;
    }
}

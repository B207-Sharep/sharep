package com.sharep.be.modules.member;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.project.Project;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(mappedBy = "member")
    private Set<Role> roles;

    @OneToMany(mappedBy = "member")
    private List<Job> jobs;

    @Column(length = 255)
    private String summary;

    @OneToMany(mappedBy = "member")
    private List<Assignee> assignees;

    @Builder
    public Member(Project project, Account account) {
        this.project = project;
        this.account = account;
    }

    public void updateSummary(String summary){
        this.summary = summary;
    }
}

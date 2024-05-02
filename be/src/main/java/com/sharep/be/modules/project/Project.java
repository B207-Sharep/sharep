package com.sharep.be.modules.project;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.NamedSubgraph;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@Getter
@NamedEntityGraph(
        name = "Project.withMembersAndRoles",
        attributeNodes ={
                @NamedAttributeNode(value = "members", subgraph = "roles"),
                @NamedAttributeNode(value = "leader")
        },
        subgraphs = @NamedSubgraph(name = "roles", attributeNodes = @NamedAttributeNode("roles"))
)
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

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<Member> members;

    @Builder
    public Project(Account leader, String title, String bio) {
        this.leader = leader;
        this.title = title;
        this.bio = bio;
        this.createdAt = LocalDateTime.now(); // TODO auditing 달기
    }

    public String createToken(){
        String random = RandomStringUtils.random(15, true, true);
        this.secretKey = random;
        return random;
    }

    public boolean ifLeader(Account account){
        return leader.equals(account);
    }

}
